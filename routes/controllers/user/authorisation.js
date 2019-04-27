/* global include */

const passport = require( 'passport' );
const LocalStrategy = require( 'passport-local' ).Strategy;
const bcrypt = require( 'bcryptjs' );
const validator = require( 'validator' );

const getUserByEmail = include( 'models/get' ).getUserByEmail;
const getUserByUsername = include( 'models/get' ).getUserByUsername;
const getUserById = include( 'models/get' ).getUserById;

module.exports.auth = async function ( req, res ) {
  const id = req.user;
  if ( !id ) return res.send( { 'type': 'fail', 'errors': [ { 'reason': 'user is not logged in' } ] } );
  const user = await getUserById( id );

  return res.send( {
    'type': 'success',
    'details': {
      '_id': user._id,
      'name': user.details.name,
      'username': user.details.username,
      'email': user.details.email,
      'profilePicture': user.details.profilePicture,
    }
  } );
};

module.exports.login = async function ( req, res ) {
  // Use local strategy with custom callbacks
  passport.authenticate( 'local', function ( err, user, info ) {
    if ( err ) throw err;
    if ( !user ) return res.send( { 'type': 'fail', 'errors': [ info ] } );
    req.login( user[ '_id' ], function ( err ) {
      if ( err ) throw err;
      return res.send( {
        'type': 'success',
        'details': {
          '_id': user._id,
          'username': user.username,
          'name': user.name,
          'email': user.email,
          'profilePicture': user.profilePicture
        }
      } );
    } );
  } )( req, res );
};

module.exports.logout = async function ( req, res ) {
  req.logout();
  req.session.destroy();

  return res.send( {
    'type': 'success'
  } );
};

// Simple passportjs local strategy
passport.use( 'local', new LocalStrategy(
  // Remember the username and password fields have to be named 'username' and 'password'. See passportjs documentation to change default names.
  async function ( username, password, done ) {
    // Checks that both inputs are string, so no errors occur.
    if ( typeof username != 'string' || typeof password != 'string' ) {
      return done( null, false, { 'reason': 'only strings are accepted', 'fields': [ 'username', 'password' ], 'return': { username, password } } );
    }

    // Finds the user by username/email. If the username looks like a valid email it will find user by email, else it will find by username.
    let user;
    user = validator.isEmail( username ) ? user = await getUserByEmail( username ): await getUserByUsername( username );

    if ( !user ) {
      // If it does not find a user will return false and say that it could not find a user
      return done( null, false, { 'reason': 'no account', 'fields': [ 'username' ], 'return': { username } } );
    } else if ( !user.details.verified ) {
      // If the user is not verified will return false and say that the user is not verified.
      return done( null, false, { 'reason': 'not verified', 'fields': [ 'username' ], 'return': { username } } );
    }

    // Compares the candidate password to the users password, if they are 'equal' the strategy will return true and the users id, name, username, and email. Else false and an incorrect password message.
    if ( await bcrypt.compare( password, user.details.password ) ) {
      return done( null, {
        '_id': user[ '_id' ],
        'name': user.details.name,
        'username': user.details.username,
        'email': user.details.email,
        'profilePicture': user.details.profilePicture,
      }, { message: 'done' } );
    } else {
      return done( null, false, { 'reason': 'incorrect password', 'fields': [ 'password' ], 'return': {} } );
    }
  }
) );

passport.serializeUser( function ( user, done ) {
  done( null, user );
} );

passport.deserializeUser( function ( user, done ) {
  done( null, user );
} );