const validator = require( 'validator' );

const name = 'Kelvin John Szolnoky';
const username = 'ippyson';
const birthday = '2001-06-28';
const email = 'kelvin@szolnoky.com';
const password = 'Testpassword1'
const gender = '0';

if ( !validator.isLength( name, { min: 3, max: 64 } ) ) return false;
if ( !/^(([A-Za-zÀ-ÖØ-öø-ÿ]+)\s*){2,}$/.test( name ) ) return false;

if ( !validator.isLength( username, { min: 3, max: 24 } ) ) return false;
if ( !/^(\w+)$/.test( username ) ) return false;

if ( !validator.isISO8601( birthday, { strict: true } ) ) return false;

if ( !validator.isEmail( email ) ) return false;

if ( !validator.isLength( password, { min: 8, max: 72 } ) ) return false;
if ( !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test( password ) ) return false;

if ( !validator.isInt( gender, { min: 0, max: 4 } ) ) return false;

console.log( "VALID" );