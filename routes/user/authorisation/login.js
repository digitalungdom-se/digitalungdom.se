const express = require( 'express' );
const router = express.Router();
const passport = require( 'passport' );
const LocalStrategy = require( 'passport-local' ).Strategy;
const bcrypt = require( 'bcryptjs' );
const validator = require( 'validator' );

const ensureUserAuthenticated = require( './../../../helpers/ensureUserAuthentication' ).ensureUserAuthenticated;
const ensureNotUserAuthenticated = require( './../../../helpers/ensureUserAuthentication' ).ensureNotUserAuthenticated;

const getUserByEmail = require( './../../../models/get' ).getUserByEmail;
const getUserByUsername = require( './../../../models/get' ).getUserByUsername;

router.post( '/login', async function( req, res ) {
  passport.authenticate( 'local', function( err, user, info ) {
    if ( err ) throw err;
    if ( !user ) return res.send( { type: 'fail', reason: info } )
    req.login( user[ '_id' ], function( err ) {
      if ( err ) throw err;
      return res.send( { type: 'success', username: user.username, name: user.name, email: user.email } );
    } );
  } )( req, res )
} );

passport.use( 'local', new LocalStrategy(
  async function( username, password, done ) {
    if ( typeof username != 'string' || typeof password != 'string' ) {
      return done( null, false, { field: 'username', message: 'Kolla inmatning.' } );
    }

    let user;
    user = validator.isEmail( username ) ? user = await getUserByEmail( db, username ) : await getUserByUsername( db, username );

    if ( !user ) {
      return done( null, false, { field: 'username', message: 'Det finns inget konto kopplat till det användarnamn/epost adress.' } );
    } else if ( !user.verified ) {
      return done( null, false, { field: 'username', message: 'Kontot är inte verifierad.' } );
    }

    if ( await bcrypt.compare( password, user.password ) ) {
      return done( null, { '_id': user[ '_id' ], name: user.name, username: user.username, email: user.email }, { message: 'Klart.' } );
    } else {
      return done( null, false, { field: 'password', message: 'Felaktigt lösenord.' } );
    }
  }
) );

passport.serializeUser( function( user, done ) {
  done( null, user );
} );

passport.deserializeUser( function( user, done ) {
  done( null, user );
} );

module.exports = router;