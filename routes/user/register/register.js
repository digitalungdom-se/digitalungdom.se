const express = require( 'express' );
const router = express.Router();
const validator = require( 'validator' );

const ensureUserAuthenticated = require( './../../../helpers/ensureUserAuthentication' ).ensureUserAuthenticated;
const ensureNotUserAuthenticated = require( './../../../helpers/ensureUserAuthentication' ).ensureNotUserAuthenticated;

const checkUsername = require( './../../../models/check' ).checkUsername;
const checkEmail = require( './../../../models/check' ).checkEmail;
const getAgreementVersion = require( './../../../models/get' ).getAgreementVersion;
const createUser = require( './../../../models/user/register' ).createUser;
const sendVerification = require( './../../../models/user/register' ).sendVerification;

router.post( '/register', ensureNotUserAuthenticated, async function( req, res ) {
  const name = req.body.name;
  const username = req.body.username;
  const birthdate = req.body.birthdate;
  let email = req.body.email;
  const password = req.body.password;
  const gender = req.body.gender;

  if ( typeof name != 'string' || typeof username != 'string' || typeof birthdate != 'string' || typeof email != 'string' || typeof password != 'string' || typeof gender != 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Only strings are accepted' } );

  email = validator.normalizeEmail( email );

  if ( !validator.isLength( name, { min: 3, max: 64 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Name length is either too long or too short', 'name': name } );
  if ( name.split( ' ' ).filter( n => n ).length < 2 ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Not enough names, at least first name and surname', 'name': name } );
  if ( !/^(([A-Za-zÀ-ÖØ-öø-ÿ\-\'\,\.\ ]+))$/.test( name ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Invalid characters in name', 'name': name } );

  if ( !validator.isLength( username, { min: 3, max: 24 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Username length is either too long or too short', 'username': username } );
  if ( !/^(\w+)$/.test( username ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Invalid characters in username', 'username': username } );

  if ( !validator.isLength( birthdate, { min: 10, max: 12 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'birthdate length is either too long or too short', 'birthdate': birthdate } );
  if ( !validator.isISO8601( birthdate, { strict: true } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Malformed date for birthdate', 'birthdate': birthdate } );
  if ( !validator.isBefore( birthdate ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Back to the future?', 'birthdate': birthdate } );

  if ( !validator.isLength( email, { min: 6, max: 255 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'email length is either too long or too short', 'email': email } );
  if ( !validator.isEmail( email ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Malformed email address', 'email': email } );

  if ( !validator.isLength( password, { min: 8, max: 72 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Password length is either too long or too short', 'password': password } );
  if ( !/((.*[a-öA-Ö])(.*[0-9]))|((.*[0-9])(.*[a-öA-Ö]))/.test( password ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Password is not strong enough', 'password': password } );

  if ( !validator.isInt( gender, { min: 0, max: 4 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Gender is malformed', 'gender': gender } );

  const [ usernameExists, emailExists, agreementVersion ] = await Promise.all( [
    checkUsername( db, username ),
    checkEmail( db, email ),
    getAgreementVersion( db ),
  ] );

  if ( !emailExists ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Email address already exists', 'email': email } );
  if ( !usernameExists ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Username already exists', 'username': username } );

  const date = birthdate.split( '-' );
  const user = {
    "email": email,
    "password": password,
    "name": name.toLowerCase().split( ' ' ).filter( n => n ).map( ( s ) => ( [ 'von', 'van', 'de', 'der', 'los', 'ibn', 'd´' ].indexOf( s ) == -1 ) ? s.charAt( 0 ).toUpperCase() + s.substring( 1 ) : s ).join( ' ' ),
    "username": username,
    "usernameLower": username.toLowerCase(),
    "birthdate": new Date( Date.UTC( date[ 0 ], date[ 1 ] - 1, date[ 2 ] ) ),
    "gender": parseInt( gender ),
    "resetPasswordToken": null,
    "resetPasswordExpires": null,
    "verified": true,
    "verificationToken": null,
  }

  await createUser( db, user );
  //await sendVerification( db, user.email );

  return res.status( 201 ).send( { type: 'success', username: user.username, name: user.name, email: user.email } );
} );

module.exports = router;