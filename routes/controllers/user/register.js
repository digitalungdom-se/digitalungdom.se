/* global include */

const validator = require( 'validator' );

const checkUsername = include( 'models/check' ).checkUsername;
const checkEmail = include( 'models/check' ).checkEmail;
const getAgreementVersion = include( 'models/get' ).getAgreementVersion;
const createUser = include( 'models/user/register' ).createUser;
const verify = include( 'models/user/register' ).verify;

module.exports.verify = async function ( req, res ) {
  // error array, should be used in every controller to handle errors and return them to client
  const errors = [];

  const status = await verify( req.body.token );
  if ( status.error ) errors.push( { 'reason': status.error, 'fields': status.fields, 'return': status.return } );

  if ( errors.length > 0 ) return res.status( 400 ).send( { 'type': 'fail', 'errors': errors } );
  else return res.send( { 'type': 'success' } );
};

module.exports.register = async function ( req, res ) {
  // error array, should be used in every controller to handle errors and return them to client
  const errors = [];
  // Fetches all the fields and their values
  const name = req.body.name;
  const username = req.body.username;
  const birthdate = req.body.birthdate;
  let email = req.body.email;
  const password = req.body.password;
  const gender = req.body.gender;

  // Checks that they all are strings, validatorjs only allows string (prevent errors)
  if ( typeof name != 'string' || typeof username != 'string' || typeof birthdate != 'string' || typeof email != 'string' || typeof password != 'string' || typeof gender != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'fields': [ 'name', 'username', 'birthdate', 'email', 'password', 'gender' ], 'return': { name, username, birthdate, email, password, gender } } );

  // Validates name according to following rules: min 3 max 64 characters, min 2 names (e.g. Firstname Surname), only includes allowed characters (A-Z, a-z (including all diatrics), and - ' , . ')
  if ( !validator.isLength( name, { min: 3, max: 64 } ) ) errors.push( { 'reason': 'name is not in length range 3-64', 'fields': [ 'name' ], 'return': { name } } );
  if ( name.split( ' ' ).filter( n => n ).length < 2 ) errors.push( { 'reason': 'not enough names, must include atleast first name and surname', 'fields': [ 'name' ], 'return': { name } } );
  if ( !/^(([A-Za-zÀ-ÖØ-öø-ÿ\-',.\s ]+))$/.test( name ) ) errors.push( { 'reason': 'invalid characters in name', 'fields': [ 'name' ], 'return': { name } } );

  // Validates username according to following rules: min 3 max 24 characters and only includes valid characters (A-Z, a-z, 0-9, and _)
  if ( !validator.isLength( username, { min: 3, max: 24 } ) ) errors.push( { 'reason': 'username is not in length range 3-24', 'fields': [ 'username' ], 'return': { username } } );
  if ( !/^(\w+)$/.test( username ) ) errors.push( { 'reason': 'invalid characters in username', 'fields': [ 'username' ], 'return': { username } } );

  // Validates birthdate according to following rules: makes sure that the date is correct length, makes sure that is is a date (strict, i.e. that is is a valid date too. See validatorjs documentation), and that is actually is a birthdate (i.e. is before the current date).
  if ( !validator.isISO8601( birthdate, { strict: true } ) ) errors.push( { 'reason': 'malformed date', 'fields': [ 'birthdate' ], 'return': { birthdate } } );
  if ( !validator.isBefore( birthdate ) ) errors.push( { 'reason': 'back to the future?', 'fields': [ 'birthdate' ], 'return': { birthdate } } );

  // Validates email according to following rules: is a valid email.
  if ( !validator.isEmail( email ) ) errors.push( { 'reason': 'malformed email address', 'fields': [ 'email' ], 'return': { email } } );
  // Normalises email according to validatorjs (see validatorjs documentation for rules)
  email = validator.normalizeEmail( email );

  // Validates password according to following rules: min 8 max 72 characters, includes at least one character and one number
  if ( !validator.isLength( password, { min: 8, max: 72 } ) ) errors.push( { 'reason': 'password is not in length range 8-72', 'fields': [ 'password' ], 'return': { password } } );
  if ( !/((.*[a-öA-Ö])(.*[0-9]))|((.*[0-9])(.*[a-öA-Ö]))/.test( password ) ) errors.push( { 'reason': 'password is not strong enough', 'fields': [ 'password' ], 'return': { password } } );

  // Validates gender according to following rules: is an integer between 0 and 3.
  if ( !validator.isInt( gender, { min: 0, max: 3 } ) ) errors.push( { 'reason': 'gender is not an integer from 0-3', 'fields': [ 'gender' ], 'return': { gender } } );

  const queryArray = [
    checkUsername( username ),
    checkEmail( email ),
    getAgreementVersion(),
  ];

  // Validates that the username, email does not already exist and retrieves the current agreement version
  const [ usernameExists, emailExists, agreementVersion ] = await Promise.all( queryArray );

  // Returns errors if the email/username already exists.
  if ( !emailExists.valid ) errors.push( { 'reason': 'email already in use', 'fields': [ 'email' ], 'return': { email } } );
  if ( !usernameExists.valid ) errors.push( { 'reason': 'username already in use', 'fields': [ 'username' ], 'return': { username } } );

  if ( errors.length > 0 ) return res.status( 400 ).send( { 'type': 'fail', 'errors': errors } );

  // Formats date so it can be parsed into a date object
  // The long name function parses the users name so that each initial letter is capatalised (exclues von, van, and etc). E.g. fiRsTNAme SuRNAme => Firstname Surname. May be removed later.
  const date = birthdate.split( '-' );
  const user = {
    'details': {
      'username': username,
      'email': email,
      'verified': false,
      'password': password,
      'name': name.toLowerCase().split( ' ' ).filter( n => n ).map( ( s ) => ( [ 'von', 'van', 'de', 'der', 'los', 'ibn', 'd´', 'd\'' ].indexOf( s ) === -1 ) ? s.charAt( 0 ).toUpperCase() + s.substring( 1 ) : s ).join( ' ' ),
      'birthdate': new Date( Date.UTC( date[ 0 ], date[ 1 ] - 1, date[ 2 ] ) ),
      'gender': parseInt( gender ),
      'profilePicture': null,
      'school': undefined,
      'company': undefined,
      'city': undefined,
      'address': {
        'city': undefined,
        'postNumber': undefined,
        'address': undefined,
      },
      'phoneNumber': undefined,
      'personalNumber': undefined,
      'publicKey': undefined,
      'badges': [],
      'roles': [],
      'societies': [],
      'agreementVersion': agreementVersion,
    },
    'settings': {
      'appearance': {
        'language': 'swedish',
        'nightMode': false,
        'sort': 'new',
        'display': 'default',
        'newTab': false,
      },
      'notifications': {},
      'privacy': {
        'securityHistory': false,
        'displayName': 'name',
      },
    },
    'profile': {
      'badges': [],
      'colour': undefined,
      'status': undefined,
      'bio': undefined,
      'url': undefined,
    },
    'agora': {
      'followedHypagoras': [],
      'followedUsers': [],
      'starredAgoragrams': [],
      'score': {
        'posts': 0,
        'comments': 0,
        'stars': 0,
        'followers': 0,
      },
    },
    'resetPassword': {},
    'cooldowns': {},
    'connectedApps': {},
    'notifications': [],
    'securityHistory': [],
  };

  //creates user
  createUser( user );

  return res.status( 201 ).send( { 'type': 'success', 'username': user.username, 'name': user.name, 'email': user.email } );
};