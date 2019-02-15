const express = require( 'express' );
const router = express.Router();
const validator = require( 'validator' );

const ensureUserAuthenticated = require( './../../../helpers/ensureUserAuthentication' ).ensureUserAuthenticated;
const ensureNotUserAuthenticated = require( './../../../helpers/ensureUserAuthentication' ).ensureNotUserAuthenticated;
const handleError = require( './../../../helpers/handleError' ).handleError;

const checkUsername = require( './../../../models/check' ).checkUsername;
const checkEmail = require( './../../../models/check' ).checkEmail;
const getAgreementVersion = require( './../../../models/get' ).getAgreementVersion;
const createUser = require( './../../../models/user/register' ).createUser;
const sendVerification = require( './../../../models/user/register' ).sendVerification;

router.post( '/register', ensureNotUserAuthenticated, async function( req, res ) {
  try {
    const name = req.body.name;
    const username = req.body.username;
    const birthday = req.body.birthday;
    let email = req.body.email;
    const password = req.body.password;
    const gender = req.body.gender;

    if ( typeof name != 'string' || typeof username != 'string' || typeof birthday != 'string' || typeof email != 'string' || typeof password != 'string' || typeof gender != 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Only strings are accepted', 'email': email } );

    email = validator.normalizeEmail( email );

    if ( !validator.isLength( name, { min: 3, max: 64 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Name length is either too long or too short', 'name': name } );
    if ( !/^(([A-Za-zÀ-ÖØ-öø-ÿ]+)\s*){2,}$/.test( name ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Invalid characters in name', 'name': name } );

    if ( !validator.isLength( username, { min: 3, max: 24 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Username length is either too long or too short', 'username': username } );
    if ( !/^(\w+)$/.test( username ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Invalid characters in username', 'username': username } );

    if ( !validator.isISO8601( birthday, { strict: true } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Malformed date for birthday', 'birthday': birthday } );

    if ( !validator.isEmail( email ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Malformed email address', 'email': email } );

    if ( !validator.isLength( password, { min: 8, max: 72 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Password length is either too long or too short', 'password': password } );
    if ( !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test( password ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Password is not strong enough', 'password': password } );

    if ( !validator.isInt( gender, { min: 0, max: 4 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Gender is malformed', 'gender': gender } );

    const [ usernameExists, emailExists, agreementVersion ] = await Promise.all( [
      checkUsername( db, username ),
      checkEmail( db, email ),
      getAgreementVersion( db )
    ] );

    if ( !emailExists ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Email address already exists', 'email': email } );
    if ( !usernameExists ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Username already exists', 'username': username } );

    const date = birthday.split( '-' );
    const user = {
      "email": email,
      "password": password,
      "name": name.toLowerCase().split( ' ' ).map( ( s ) => s.charAt( 0 ).toUpperCase() + s.substring( 1 ) ).join( ' ' ),
      "username": username,
      "usernameLower": username.toLowerCase(),
      "birthday": new Date( Date.UTC( date[ 0 ], date[ 1 ] - 1, date[ 2 ] ) ),
      "gender": parseInt( gender ),
      "created": new Date(),
      "resetPasswordToken": null,
      "resetPasswordExpires": null,
      "verified": false,
      "verificationToken": null,
    }

    await createUser( db, user );
    //await sendVerification( db, user.email );

    return res.status( 201 ).send( { 'type': 'success', 'email': email } );

  } catch ( e ) {
    handleError( req, res, e )
  }
} );

module.exports = router;