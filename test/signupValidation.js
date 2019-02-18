const validator = require( 'validator' );

const name = 'Kelvin   Szolnoky';
const username = 'ippyson';
const birthdate = '2001-06-28';
let email = 'kelvin@szolnoky.com';
const password = 'Testpassword1'
const gender = '0';


if ( typeof name != 'string' || typeof username != 'string' || typeof birthdate != 'string' || typeof email != 'string' || typeof password != 'string' || typeof gender != 'string' ) return console.log( 'Undefined' );

email = validator.normalizeEmail( email );

if ( !validator.isLength( name, { min: 3, max: 64 } ) ) return console.log( 'Name length', name );
if ( name.split( ' ' ).filter( n => n ).length < 2 ) return console.log( 'Name amount', name );
if ( !/^(([A-Za-zÀ-ÖØ-öø-ÿ\-\'\,\.\ ]+))$/.test( name ) ) return console.log( 'Name format', name );

if ( !validator.isLength( username, { min: 3, max: 24 } ) ) return console.log( 'Username length', username );
if ( !/^(\w+)$/.test( username ) ) return console.log( 'Username format', username );

if ( !validator.isISO8601( birthdate, { strict: true } ) ) return console.log( 'Birthdate date', birthdate );
if ( !validator.isBefore( birthdate ) ) return console.log( 'Birthdate before', birthdate );

if ( !validator.isEmail( email ) ) return console.log( 'Email not email', email );

if ( !validator.isLength( password, { min: 8, max: 72 } ) ) return console.log( 'Password length', password );
if ( !/((.*[a-öA-Ö])(.*[0-9]))|((.*[0-9])(.*[a-öA-Ö]))/.test( password ) ) return console.log( 'Password format', password );

if ( !validator.isInt( gender, { min: 0, max: 4 } ) ) return console.log( 'Gender', gender );

const date = birthdate.split( '-' );
const user = {
  "email": email,
  "password": password,
  "name": name.toLowerCase().split( ' ' ).filter( n => n ).map( ( s ) => s.charAt( 0 ).toUpperCase() + s.substring( 1 ) ).join( ' ' ),
  "username": username,
  "usernameLower": username.toLowerCase(),
  "birthdate": new Date( Date.UTC( date[ 0 ], date[ 1 ] - 1, date[ 2 ] ) ),
  "gender": parseInt( gender ),
  "created": new Date(),
  "resetPasswordToken": null,
  "resetPasswordExpires": null,
  "verified": false,
  "verificationToken": null,
}

console.log( user );