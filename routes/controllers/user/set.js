/* global include */

const validator = require( 'validator' );
const bcrypt = require( 'bcryptjs' );
const personnummer = require( 'personnummer.js' );
const validateObjectID = require( 'mongodb' ).ObjectID.isValid;

const checkUsername = include( 'models/check' ).checkUsername;
const checkEmail = include( 'models/check' ).checkEmail;
const checkBadges = include( 'models/check' ).checkBadges;

const getUserById = include( 'models/get' ).getUserById;

const userSet = include( 'models/user/set' ).userSet;
const setNewEmail = include( 'models/user/set' ).setNewEmail;

const validateProfilePicture = include( 'utils/validation/validateProfilePicture' ).validateProfilePicture;


const validate = {
  'details': {
    'username': async function ( req, res, userId, update ) {
      // error array, should be used in every controller to handle errors and return them to client
      const errors = [];
      const username = update.username;
      if ( typeof username != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'return': { username }, 'fields': [ 'username' ] } );
      // Validates username according to following rules: min 3 max 24 characters and only includes valid characters (A-Z, a-z, 0-9, and _)
      if ( !validator.isLength( username, { min: 3, max: 24 } ) ) errors.push( { 'reason': 'username is not in length range 0-24', 'return': { username }, 'fields': [ 'username' ] } );
      if ( !/^(\w+)$/.test( username ) ) errors.push( { 'reason': 'invalid characters in username', 'return': { username }, 'fields': [ 'username' ] } );

      const usernameExists = await checkUsername( username );
      if ( !usernameExists.valid ) errors.push( { 'reason': 'username already exists', 'return': { username }, 'fields': [ 'username' ] } );

      if ( errors.length > 0 ) return { errors };

      const databaseUpdate = { $set: { 'details.username': username } };

      return { 'errors': false, databaseUpdate };
    }, 'email': async function ( req, res, userId, update ) {
      // error array, should be used in every controller to handle errors and return them to client
      const errors = [];
      let email = update.email;
      if ( typeof email != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'return': { email }, 'fields': [ 'email' ] } );
      // Validates email according to following rules: is a valid email.
      if ( !validator.isEmail( email ) ) errors.push( { 'reason': 'malformed email address', 'return': { email }, 'fields': [ 'email' ] } );
      // Normalises email according to validatorjs (see validatorjs documentation for rules)
      email = validator.normalizeEmail( email );

      const usernameExists = await checkEmail( email );
      if ( !usernameExists.valid ) errors.push( { 'reason': 'email already exists', 'return': { email }, 'fields': [ 'email' ] } );

      if ( errors.length > 0 ) return { errors };

      setNewEmail( userId, email );

      const databaseUpdate = false;

      return { 'errors': false, databaseUpdate };
    }, 'password': async function ( req, res, userId, update ) {
      // error array, should be used in every controller to handle errors and return them to client
      const errors = [];
      const password = update.password;
      const newPassword = update.newPassword;
      if ( typeof password != 'string' || typeof newPassword != 'string' ) errors.push( { 'reason': 'only accepts strings', 'return': { password, newPassword }, 'fields': [ 'password', 'newPassword' ] } );
      let promiseArray = [];
      // Validates password according to following rules: min 8 max 72 characters, includes at least one character and one number
      if ( !validator.isLength( newPassword, { min: 8, max: 72 } ) ) errors.push( { 'reason': 'password is not in length range 8-72', 'return': { newPassword }, 'fields': [ 'newPassword' ] } );
      if ( !/((.*[a-öA-Ö])(.*[0-9]))|((.*[0-9])(.*[a-öA-Ö]))/.test( newPassword ) ) errors.push( { 'reason': 'password is not strong enough', 'return': { newPassword }, 'fields': [ 'newPassword' ] } );

      let hashedPassword;
      promiseArray.push( bcrypt.hash( newPassword, 13 ) );
      let user;
      promiseArray.push( getUserById( userId ) );

      [ hashedPassword, user ] = await Promise.all( promiseArray );
      promiseArray = [];

      if ( !( await bcrypt.compare( password, user.details.password ) ) ) errors.push( { 'reason': 'incorrect user password', 'return': { password }, 'fields': [ 'password' ] } );

      if ( errors.length > 0 ) return { errors };

      const databaseUpdate = { $set: { 'details.password': hashedPassword } };

      return { 'errors': false, databaseUpdate };
    }, 'name': async function ( req, res, userId, update ) {
      // error array, should be used in every controller to handle errors and return them to client
      const errors = [];
      let name = update.name;
      if ( typeof name != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'return': { name }, 'fields': [ 'name' ] } );

      // Validates name according to following rules: min 3 max 64 characters, min 2 names (e.g. Firstname Surname), only includes allowed characters (A-Z, a-z (including all diatrics), and - ' , . ')
      if ( !validator.isLength( name, { min: 3, max: 64 } ) ) errors.push( { 'reason': 'name is not in length range 0-64', 'return': { name }, 'fields': [ 'name' ] } );
      if ( name.split( ' ' ).filter( n => n ).length < 2 ) errors.push( { 'reason': 'not enough names, at least first name and surname', 'return': { name }, 'fields': [ 'name' ] } );
      if ( !/^(([A-Za-zÀ-ÖØ-öø-ÿ\-',.\s ]+))$/.test( name ) ) errors.push( { 'reason': 'invalid characters in name', 'return': { name }, 'fields': [ 'name' ] } );

      if ( errors.length > 0 ) return { errors };

      name = name.toLowerCase().split( ' ' ).filter( n => n ).map( ( s ) => ( [ 'von', 'van', 'de', 'der', 'los', 'ibn', 'd´', 'd\'' ].indexOf( s ) === -1 ) ? s.charAt( 0 ).toUpperCase() + s.substring( 1 ) : s ).join( ' ' );

      const databaseUpdate = { $set: { 'details.name': name } };

      return { 'errors': false, databaseUpdate };
    }, 'birthdate': async function ( req, res, userId, update ) {
      // error array, should be used in every controller to handle errors and return them to client
      const errors = [];
      const birthdate = update.birthdate;
      if ( typeof birthdate != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'return': { birthdate }, 'fields': [ 'birthdate' ] } );

      // Validates birthdate according to following rules: makes sure that the date is correct length, makes sure that is is a date (strict, i.e. that is is a valid date too. See validatorjs documentation), and that is actually is a birthdate (i.e. is before the current date).
      if ( !validator.isISO8601( birthdate, { strict: true } ) ) errors.push( { 'reason': 'malformed date', 'return': { birthdate }, 'fields': [ 'birthdate' ] } );
      if ( !validator.isBefore( birthdate ) ) errors.push( { 'reason': 'back to the future?', 'return': { birthdate }, 'fields': [ 'birthdate' ] } );

      if ( errors.length > 0 ) return { errors };

      let date = birthdate.split( '-' );
      date = new Date( Date.UTC( date[ 0 ], date[ 1 ] - 1, date[ 2 ] ) );

      const databaseUpdate = { $set: { 'details.birthdate': date } };

      return { 'errors': false, databaseUpdate };
    }, 'gender': async function ( req, res, userId, update ) {
      // error array, should be used in every controller to handle errors and return them to client
      const errors = [];
      let gender = update.gender;
      if ( typeof gender != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'return': { gender }, 'fields': [ 'gender' ] } );

      // Validates gender according to following rules: is an integer between 0 and 3.
      if ( !validator.isInt( gender, { min: 0, max: 3 } ) ) errors.push( { 'reason': 'gender is malformed', 'return': { gender }, 'fields': [ 'gender' ] } );

      if ( errors.length > 0 ) return { errors };

      gender = parseInt( gender );

      const databaseUpdate = { $set: { 'details.gender': gender } };

      return { 'errors': false, databaseUpdate };
    }, 'profilePicture': async function ( req, res, userId, update ) {
      // error array, should be used in every controller to handle errors and return them to client
      const errors = [];
      if ( !req.files && !req.files.profilePicture ) errors.push( { 'reason': 'no files uploaded' } );

      const profilePictureBuffer = req.files.profilePicture.data;
      const pictureValidation = await validateProfilePicture( profilePictureBuffer, req.files.profilePicture.truncated );

      if ( pictureValidation.error ) errors.push( { 'reason': pictureValidation.reason, 'fields': [ 'profilePicture' ] } );

      if ( errors.length > 0 ) return { errors };

      const databaseUpdate = { $set: { 'details.profilePicture': profilePictureBuffer } };

      return { 'errors': false, databaseUpdate };
    }, 'school': async function ( req, res, userId, update ) {
      // error array, should be used in every controller to handle errors and return them to client
      const errors = [];
      let school = update.school;
      if ( typeof school != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'return': { school }, 'fields': [ 'school' ] } );

      // Validates school according to following rules: length is between 3-86
      if ( !validator.isLength( school, { min: 3, max: 86 } ) ) errors.push( { 'reason': 'school is not in length range 3-86', 'return': { school }, 'fields': [ 'school' ] } );

      if ( errors.length > 0 ) return { errors };

      school = school.toLowerCase().split( ' ' ).filter( n => n ).map( ( s ) => ( [].indexOf( s ) === -1 ) ? s.charAt( 0 ).toUpperCase() + s.substring( 1 ) : s ).join( ' ' );

      const databaseUpdate = { $set: { 'details.school': school } };

      return { 'errors': false, databaseUpdate };
    }, 'city': async function ( req, res, userId, update ) {
      // error array, should be used in every controller to handle errors and return them to client
      const errors = [];
      let city = update.city;
      if ( typeof city != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'return': { city }, 'fields': [ 'city' ] } );

      // Validates city according to following rules: length is between 3-86
      if ( !validator.isLength( city, { min: 3, max: 86 } ) ) errors.push( { 'reason': 'city is not in length range 3-86', 'return': { city }, 'fields': [ 'city' ] } );

      if ( errors.length > 0 ) return { errors };

      city = city.toLowerCase().split( ' ' ).filter( n => n ).map( ( s ) => ( [].indexOf( s ) === -1 ) ? s.charAt( 0 ).toUpperCase() + s.substring( 1 ) : s ).join( ' ' );

      const databaseUpdate = { $set: { 'details.city': city } };

      return { 'errors': false, databaseUpdate };
    }, 'company': async function ( req, res, userId, update ) {
      // error array, should be used in every controller to handle errors and return them to client
      const errors = [];
      let company = update.company;
      if ( typeof company != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'return': { company }, 'fields': [ 'company' ] } );

      // Validates company according to following rules: length is between 3-86
      if ( !validator.isLength( company, { min: 3, max: 86 } ) ) errors.push( { 'reason': 'company is not in length range 3-86', 'return': { company }, 'fields': [ 'company' ] } );

      if ( errors.length > 0 ) return { errors };

      company = company.toLowerCase().split( ' ' ).filter( n => n ).map( ( s ) => ( [].indexOf( s ) === -1 ) ? s.charAt( 0 ).toUpperCase() + s.substring( 1 ) : s ).join( ' ' );

      const databaseUpdate = { $set: { 'details.company': company } };

      return { 'errors': false, databaseUpdate };
    }, 'phoneNumber': async function ( req, res, userId, update ) {
      // error array, should be used in every controller to handle errors and return them to client
      const errors = [];
      let phoneNumber = update.phoneNumber;
      if ( typeof phoneNumber != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'return': { phoneNumber }, 'fields': [ 'phoneNumber' ] } );

      // Validates phoneNumber according to following rules: is a phone number
      if ( !validator.isMobilePhone( phoneNumber, validator.isMobilePhoneLocales, { 'strictMode': true } ) ) errors.push( { 'reason': 'phoneNumber is malformed. must contain country code', 'return': { phoneNumber }, 'fields': [ 'phoneNumber' ] } );

      if ( errors.length > 0 ) return { errors };

      const databaseUpdate = { $set: { 'details.phoneNumber': phoneNumber } };

      return { 'errors': false, databaseUpdate };
    }, 'personalNumber': async function ( req, res, userId, update ) {
      // error array, should be used in every controller to handle errors and return them to client
      const errors = [];
      let personalNumber = update.personalNumber;
      if ( typeof personalNumber != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'return': { personalNumber }, 'fields': [ 'personalNumber' ] } );

      const personnummerValidation = personnummer.parse( personalNumber, { strict: true } );

      // Validates phoneNumber according to following rules: is a swedish personal number
      if ( !personnummerValidation.valid ) errors.push( { 'reason': 'personalNumber is malformed', 'return': { personalNumber }, 'fields': [ 'personalNumber' ] } );

      if ( errors.length > 0 ) return { errors };

      const databaseUpdate = { $set: { 'details.personalNumber': personnummerValidation.normalised } };

      return { 'errors': false, databaseUpdate };
    }, 'publicKey': async function ( req, res, userId, update ) {
      // error array, should be used in every controller to handle errors and return them to client
      const errors = [];
      let publicKey = update.publicKey;
      if ( typeof publicKey != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'return': { publicKey }, 'fields': [ 'publicKey' ] } );

      // Validates phoneNumber according to following rules: length is between 100 and 1000
      if ( !validator.isLength( publicKey, { min: 100, max: 1000 } ) ) errors.push( { 'reason': 'publicKey is not in length range 100-1000', 'return': { publicKey }, 'fields': [ 'publicKey' ] } );

      if ( errors.length > 0 ) return { errors };

      const databaseUpdate = { $set: { 'details.publicKey': publicKey } };

      return { 'errors': false, databaseUpdate };
    }, 'address': async function ( req, res, userId, update ) {
      // error array, should be used in every controller to handle errors and return them to client
      const errors = [];
      let city = update.city;
      let postalCode = update.postalCode;
      let address = update.address;

      if ( typeof city != 'string' || typeof postalCode != 'string' || typeof address != 'string' ) return { 'reason': 'only accepts strings', 'return': { city, postalCode, address }, 'fields': [ 'city', 'postalCode', 'address' ] };

      // Validates postalCode according to following rules: is postal code
      if ( !validator.isPostalCode( postalCode, 'any' ) ) errors.push( { 'reason': 'postalCode is malformed', 'return': { postalCode }, 'fields': [ 'postalCode' ] } );
      // Validates city according to following rules: length is between 3 and 86
      if ( !validator.isLength( city, { min: 3, max: 86 } ) ) errors.push( { 'reason': 'city is not in length range 3-86', 'return': { city }, 'fields': [ 'city' ] } );
      // Validates address according to following rules: length is between 3 and 86
      if ( !validator.isLength( address, { min: 3, max: 86 } ) ) errors.push( { 'reason': 'address is not in length range 3-86', 'return': { address }, 'fields': [ 'address' ] } );

      if ( errors.length > 0 ) return { errors };

      const addressObj = {
        'city': city,
        'postalCode': postalCode,
        'address': address
      };

      const databaseUpdate = { $set: { 'details.address': addressObj } };

      return { 'errors': false, databaseUpdate };
    },
  },
  'settings': {
    'appearance': {
      'language': async function ( req, res, userId, update ) {
        // error array, should be used in every controller to handle errors and return them to client
        const errors = [];
        const language = update.language;

        if ( typeof language != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'return': { language }, 'fields': [ 'language' ] } );

        if ( !validator.isIn( language, [ 'swedish', 'english' ] ) ) errors.push( { 'reason': 'we only support swedish and english for now', 'return': { language }, 'fields': [ 'language' ] } );

        if ( errors.length > 0 ) return { errors };

        const databaseUpdate = { $set: { 'settings.appearance.language': language } };

        return { 'errors': false, databaseUpdate };
      }, 'nightMode': async function ( req, res, userId, update ) {
        // error array, should be used in every controller to handle errors and return them to client
        const errors = [];
        let nightMode = update.nightMode;

        if ( typeof nightMode != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'return': { nightMode }, 'fields': [ 'nightMode' ] } );

        if ( !validator.isBoolean( nightMode ) ) errors.push( { 'reason': 'nightMode is not boolean string', 'return': { nightMode }, 'fields': [ 'nightMode' ] } );

        if ( errors.length > 0 ) return { errors };

        nightMode = ( nightMode === 'true' );

        const databaseUpdate = { $set: { 'settings.appearance.nightMode': nightMode } };

        return { 'errors': false, databaseUpdate };
      }, 'sort': async function ( req, res, userId, update ) {
        // error array, should be used in every controller to handle errors and return them to client
        const errors = [];
        const sort = update.sort;

        if ( typeof sort != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'return': { sort }, 'fields': [ 'sort' ] } );

        if ( !validator.isIn( sort, [ 'new', 'top' ] ) ) errors.push( { 'reason': 'we only support new and top for now', 'return': { sort }, 'fields': [ 'sort' ] } );

        if ( errors.length > 0 ) return { errors };

        const databaseUpdate = { $set: { 'settings.appearance.sort': sort } };

        return { 'errors': false, databaseUpdate };
      }, 'display': async function ( req, res, userId, update ) {
        // error array, should be used in every controller to handle errors and return them to client
        const errors = [];
        const display = update.display;

        if ( typeof display != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'return': { display }, 'fields': [ 'display' ] } );

        if ( !validator.isIn( display, [ 'default', 'cozy', 'compact' ] ) ) errors.push( { 'reason': 'we only support new and top for now', 'return': { display }, 'fields': [ 'display' ] } );

        if ( errors.length > 0 ) return { errors };

        const databaseUpdate = { $set: { 'settings.appearance.display': display } };

        return { 'errors': false, databaseUpdate };
      }, 'newTab': async function ( req, res, userId, update ) {
        // error array, should be used in every controller to handle errors and return them to client
        const errors = [];
        let newTab = update.newTab;

        if ( typeof newTab != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'return': { newTab }, 'fields': [ 'newTab' ] } );

        if ( !validator.isBoolean( newTab ) ) errors.push( { 'reason': 'newTab is not boolean string', 'return': { newTab }, 'fields': [ 'newTab' ] } );

        if ( errors.length > 0 ) return { errors };

        newTab = ( newTab === 'true' );

        const databaseUpdate = { $set: { 'settings.appearance.newTab': newTab } };

        return { 'errors': false, databaseUpdate };
      },
    },
    'notifications': {},
    'privacy': {
      'displayName': async function ( req, res, userId, update ) {
          // error array, should be used in every controller to handle errors and return them to client
          const errors = [];
          const displayName = update.displayName;

          if ( typeof displayName != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'return': { displayName }, 'fields': [ 'displayName' ] } );

          if ( !validator.isIn( displayName, [ 'name', 'username' ] ) ) errors.push( { 'reason': 'we only support name and username for now', 'return': { displayName }, 'fields': [ 'displayName' ] } );

          if ( errors.length > 0 ) return { errors };

          const databaseUpdate = { $set: { 'settings.privacy.displayName': displayName } };

          return { 'errors': false, databaseUpdate };
        },
        'securityHistory': async function ( req, res, userId, update ) {
          // error array, should be used in every controller to handle errors and return them to client
          const errors = [];
          let securityHistory = update.securityHistory;

          if ( typeof securityHistory != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'return': { securityHistory }, 'fields': [ 'securityHistory' ] } );

          if ( !validator.isBoolean( securityHistory ) ) errors.push( { 'reason': 'securityHistory is not boolean string', 'return': { securityHistory }, 'fields': [ 'securityHistory' ] } );

          if ( errors.length > 0 ) return { errors };

          securityHistory = ( securityHistory === 'true' );

          const databaseUpdate = { $set: { 'settings.privacy.securityHistory': securityHistory } };

          return { 'errors': false, databaseUpdate };
        },
    }
  },
  'profile': {
    'badges': async function ( req, res, userId, update ) {
      // error array, should be used in every controller to handle errors and return them to client
      const errors = [];
      const badges = update.badges;

      if ( !Array.isArray( badges ) ) errors.push( { 'reason': 'badges is not an array', 'return': { badges }, 'fields': [ 'badges' ] } );
      if ( badges.length > 3 ) errors.push( { 'reason': 'too many badges', 'return': { badges }, 'fields': [ 'badges' ] } );
      for ( let badge of badges ) {
        if ( !validateObjectID( badge ) ) errors.push( { 'reason': 'badge is not an objectID', 'return': { badge }, 'fields': [ 'badges' ] } );
      }

      if ( badges.length > 0 && !( await checkBadges( badges ) ).valid ) errors.push( { 'reason': 'unauthorised to use that/those badges', 'return': { badges }, 'fields': [ 'badges' ] } );

      if ( errors.length > 0 ) return { errors };

      const databaseUpdate = { $set: { 'profile.badges': badges } };

      return { 'errors': false, databaseUpdate };
    }, 'colour': async function ( req, res, userId, update ) {
      // error array, should be used in every controller to handle errors and return them to client
      const errors = [];
      const colour = update.colour;

      if ( typeof colour != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'return': { colour }, 'fields': [ 'colour' ] } );

      if ( !validator.isHexColor( colour ) ) errors.push( { 'reason': 'colour is not valid hex colour', 'return': { colour }, 'fields': [ 'colour' ] } );

      if ( errors.length > 0 ) return { errors };

      const databaseUpdate = { $set: { 'profile.colour': colour } };

      return { 'errors': false, databaseUpdate };
    }, 'status': async function ( req, res, userId, update ) {
        // error array, should be used in every controller to handle errors and return them to client
        const errors = [];
        const status = update.status;

        if ( typeof status != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'return': { status }, 'fields': [ 'status' ] } );

        if ( !validator.isLength( status, { min: 3, max: 32 } ) ) errors.push( { 'reason': 'status is not in length range 3-32', 'return': { status }, 'fields': [ 'status' ] } );

        if ( errors.length > 0 ) return { errors };

        const databaseUpdate = { $set: { 'profile.status': status } };

        return { 'errors': false, databaseUpdate };
      },
      'bio': async function ( req, res, userId, update ) {
          // error array, should be used in every controller to handle errors and return them to client
          const errors = [];
          const bio = update.bio;

          if ( typeof bio != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'return': { bio }, 'fields': [ 'bio' ] } );

          if ( !validator.isLength( bio, { min: 3, max: 1000 } ) ) errors.push( { 'reason': 'bio is not in length range 3-1000', 'return': { bio }, 'fields': [ 'bio' ] } );

          if ( errors.length > 0 ) return { errors };

          const databaseUpdate = { $set: { 'profile.bio': bio } };

          return { 'errors': false, databaseUpdate };
        },
        'url': async function ( req, res, userId, update ) {
          // error array, should be used in every controller to handle errors and return them to client
          const errors = [];
          const url = update.url;

          if ( typeof url != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'return': { url }, 'fields': [ 'url' ] } );

          if ( !validator.isURL( url, { protocols: [ 'http', 'https' ] } ) ) errors.push( { 'reason': 'url is an url', 'return': { url }, 'fields': [ 'url' ] } );

          if ( errors.length > 0 ) return { errors };

          const databaseUpdate = { $set: { 'profile.url': url } };

          return { 'errors': false, databaseUpdate };
        },
  },
};

module.exports.set = async function ( req, res ) {
  const userID = req.user;
  const updateField = req.body.updateField.split( '.' );
  const update = req.body.update;
  let func = validate;

  for ( let category of updateField ) {
    func = func[ category ];
    if ( !func ) return res.send( {
      'type': 'fail',
      'errors': [ { 'reason': 'updateField does not exist', 'fields': [ 'updateField' ], 'return': { 'updateField': updateField.join( '.' ) } } ]
    } );
  }

  if ( typeof func !== 'function' ) return res.send( {
    'type': 'fail',
    'errors': [ { 'reason': 'updateField does not exist', 'fields': [ 'updateField' ], 'return': { 'updateField': updateField.join( '.' ) } } ]
  } );

  if ( typeof update !== 'object' || update === null ) return res.send( {
    'type': 'fail',
    'errors': [ { 'reason': 'update is not an object', 'fields': [ 'update' ], 'return': { update } } ]
  } );

  const status = await func( req, res, userID, update );
  if ( status.errors ) {
    return res.send( { 'type': 'fail', 'errors': status.errors } );
  } else {
    if ( status.databaseUpdate ) userSet( userID, status.databaseUpdate );
    return res.send( { 'type': 'success' } );
  }
};