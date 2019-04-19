/* global include */

const validator = require( 'validator' );

const checkUsername = include( 'models/check' ).checkUsername;
const checkEmail = include( 'models/check' ).checkEmail;
const getAgreementVersion = include( 'models/get' ).getAgreementVersion;
const createUser = include( 'models/user/register' ).createUser;
const verify = include( 'models/user/register' ).verify;

const validateProfilePicture = include( 'utils/validation/validateProfilePicture' ).validateProfilePicuture;

module.exports.verify = async function ( req, res ) {
  const result = await verify( req.body.token );

  if ( result.error ) {
    return res.send( {
      'type': 'failed',
      'reason': result.error
    } );
  } else {
    return res.send( {
      'type': 'success'
    } );
  }
};

module.exports.register = async function ( req, res ) {
  // Fetches all the fields and their values
  const name = req.body.name;
  const username = req.body.username;
  const birthdate = req.body.birthdate;
  let email = req.body.email;
  const password = req.body.password;
  const gender = req.body.gender;
  let profilePicture = null;

  // Checks that they all are strings, validatorjs only allows string (prevent errors)
  if ( typeof name != 'string' || typeof username != 'string' || typeof birthdate != 'string' || typeof email != 'string' || typeof password != 'string' || typeof gender != 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Only strings are accepted' } );

  // Validates name according to following rules: min 3 max 64 characters, min 2 names (e.g. Firstname Surname), only includes allowed characters (A-Z, a-z (including all diatrics), and - ' , . ')
  if ( !validator.isLength( name, { min: 3, max: 64 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Name length is either too long or too short', 'name': name } );
  if ( name.split( ' ' ).filter( n => n ).length < 2 ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Not enough names, at least first name and surname', 'name': name } );
  if ( !/^(([A-Za-zÀ-ÖØ-öø-ÿ\-',.\s ]+))$/.test( name ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Invalid characters in name', 'name': name } );

  // Validates username according to following rules: min 3 max 24 characters and only includes valid characters (A-Z, a-z, 0-9, and _)
  if ( !validator.isLength( username, { min: 3, max: 24 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Username length is either too long or too short', 'username': username } );
  if ( !/^(\w+)$/.test( username ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Invalid characters in username', 'username': username } );

  // Validates birthdate according to following rules: makes sure that the date is correct length, makes sure that is is a date (strict, i.e. that is is a valid date too. See validatorjs documentation), and that is actually is a birthdate (i.e. is before the current date).
  if ( !validator.isISO8601( birthdate, { strict: true } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Malformed date for birthdate', 'birthdate': birthdate } );
  if ( !validator.isBefore( birthdate ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Back to the future?', 'birthdate': birthdate } );

  // Validates email according to following rules: is a valid email.
  if ( !validator.isEmail( email ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Malformed email address', 'email': email } );
  // Normalises email according to validatorjs (see validatorjs documentation for rules)
  email = validator.normalizeEmail( email );

  // Validates password according to following rules: min 8 max 72 characters, includes at least one character and one number
  if ( !validator.isLength( password, { min: 8, max: 72 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Password length is either too long or too short', 'password': password } );
  if ( !/((.*[a-öA-Ö])(.*[0-9]))|((.*[0-9])(.*[a-öA-Ö]))/.test( password ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Password is not strong enough', 'password': password } );

  // Validates gender according to following rules: is an integer between 0 and 3.
  if ( !validator.isInt( gender, { min: 0, max: 3 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Gender is malformed', 'gender': gender } );

  const queryArray = [
    checkUsername( username ),
    checkEmail( email ),
    getAgreementVersion(),
  ];

  if ( req.files && req.files.profilePicture ) {
    const profilePicture = req.files.profilePicture.data;
    queryArray.push( validateProfilePicture( profilePicture, req.files.profilePicture.truncated ) );
  }

  // Validates that the username, email does not already exist and profilePicture is correct and retrieves the current agreement version
  const [ usernameExists, emailExists, agreementVersion, pictureValidation ] = await Promise.all( queryArray );

  // Returns errors if the email/username already exists.
  if ( !emailExists.valid ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Email address already exists', 'email': email } );
  if ( !usernameExists.valid ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Username already exists', 'username': username } );
  if ( pictureValidation && pictureValidation.error ) return res.status( 400 ).send( { 'type': 'fail', 'reason': pictureValidation.reason } );

  // Formats date so it can be parsed into a date object
  // The long name function parses the users name so that each initial letter is capatalised (exclues von, van, and etc). E.g. fiRsTNAme SuRNAme => Firstname Surname. May be removed later.
  const date = birthdate.split( '-' );
  const user = {
    'details': {
      'username': username,
      'email': email,
      'verified': false,
      'password': password,
      'name': name.toLowerCase().split( ' ' ).filter( n => n ).map( ( s ) => ( [ 'von', 'van', 'de', 'der', 'los', 'ibn', 'd´' ].indexOf( s ) === -1 ) ? s.charAt( 0 ).toUpperCase() + s.substring( 1 ) : s ).join( ' ' ),
      'birthdate': new Date( Date.UTC( date[ 0 ], date[ 1 ] - 1, date[ 2 ] ) ),
      'gender': parseInt( gender ),
      'profilePicture': profilePicture,
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
  await createUser( user );

  return res.status( 201 ).send( { 'type': 'success', 'username': user.username, 'name': user.name, 'email': user.email } );
};