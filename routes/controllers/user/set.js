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
      const username = update.username;
      if ( typeof username != 'string' ) return { 'error': 'username is not a string', 'return': username, 'field': 'username' };
      // Validates username according to following rules: min 3 max 24 characters and only includes valid characters (A-Z, a-z, 0-9, and _)
      if ( !validator.isLength( username, { min: 3, max: 24 } ) ) return { 'error': 'username length is either too long or too short', 'return': username, 'field': 'username' };
      if ( !/^(\w+)$/.test( username ) ) return { 'error': 'invalid characters in username', 'return': username, 'field': 'username' };

      const usernameExists = await checkUsername( username );
      if ( !usernameExists.valid ) return { 'error': 'username already exists', 'return': username, 'field': 'username' };

      const databaseUpdate = { $set: { 'details.username': username } };

      return { 'error': false, databaseUpdate };
    }, 'email': async function ( req, res, userId, update ) {
      let email = update.email;
      if ( typeof email != 'string' ) return { 'error': 'email is not a string', 'return': email, 'field': 'email' };
      // Validates email according to following rules: is a valid email.
      if ( !validator.isEmail( email ) ) return { 'error': 'malformed email address', 'return': email, 'field': 'email' };
      // Normalises email according to validatorjs (see validatorjs documentation for rules)
      email = validator.normalizeEmail( email );

      const usernameExists = await checkEmail( email );
      if ( !usernameExists.valid ) return { 'error': 'email already exists', 'return': email, 'field': 'email' };

      setNewEmail( userId, email );

      const databaseUpdate = false;

      return { 'error': false, databaseUpdate };
    }, 'password': async function ( req, res, userId, update ) {
      const password = update.password;
      const newPassword = update.newPassword;
      if ( typeof password != 'string' || typeof newPassword != 'string' ) return { 'error': 'only accepts strings', 'return': update, 'field': 'update' };
      let promiseArray = [];
      // Validates password according to following rules: min 8 max 72 characters, includes at least one character and one number
      if ( !validator.isLength( newPassword, { min: 8, max: 72 } ) ) return { 'error': 'Password length is either too long or too short', 'return': newPassword, 'field': 'newPassword' };
      if ( !/((.*[a-öA-Ö])(.*[0-9]))|((.*[0-9])(.*[a-öA-Ö]))/.test( newPassword ) ) return { 'error': 'Password is not strong enough', 'return': newPassword, 'field': 'newPassword' };

      let hashedPassword;
      promiseArray.push( bcrypt.hash( newPassword, 13 ) );
      let user;
      promiseArray.push( getUserById( userId ) );

      [ hashedPassword, user ] = await Promise.all( promiseArray );
      promiseArray = [];

      if ( !( await bcrypt.compare( password, user.details.password ) ) ) return { 'error': 'incorrect user password', 'return': password, 'field': 'password' };

      const databaseUpdate = { $set: { 'details.password': hashedPassword } };

      return { 'error': false, databaseUpdate };
    }, 'name': async function ( req, res, userId, update ) {
      let name = update.name;
      if ( typeof name != 'string' ) return { 'error': 'name is not a string', 'return': name, 'field': 'name' };

      // Validates name according to following rules: min 3 max 64 characters, min 2 names (e.g. Firstname Surname), only includes allowed characters (A-Z, a-z (including all diatrics), and - ' , . ')
      if ( !validator.isLength( name, { min: 3, max: 64 } ) ) return { 'error': 'name length is either too long or too short', 'return': name, 'field': 'name' };
      if ( name.split( ' ' ).filter( n => n ).length < 2 ) return { 'error': 'not enough names, at least first name and surname', 'return': name, 'field': 'name' };
      if ( !/^(([A-Za-zÀ-ÖØ-öø-ÿ\-',.\s ]+))$/.test( name ) ) return { 'error': 'invalid characters in name', 'return': name, 'field': 'name' };

      name = name.toLowerCase().split( ' ' ).filter( n => n ).map( ( s ) => ( [ 'von', 'van', 'de', 'der', 'los', 'ibn', 'd´', 'd\'' ].indexOf( s ) === -1 ) ? s.charAt( 0 ).toUpperCase() + s.substring( 1 ) : s ).join( ' ' );

      const databaseUpdate = { $set: { 'details.name': name } };

      return { 'error': false, databaseUpdate };
    }, 'birthdate': async function ( req, res, userId, update ) {
      const birthdate = update.birthdate;
      if ( typeof birthdate != 'string' ) return { 'error': 'birthdate is not a string', 'return': birthdate, 'field': 'birthdate' };

      // Validates birthdate according to following rules: makes sure that the date is correct length, makes sure that is is a date (strict, i.e. that is is a valid date too. See validatorjs documentation), and that is actually is a birthdate (i.e. is before the current date).
      if ( !validator.isISO8601( birthdate, { strict: true } ) ) return { 'error': 'malformed date for birthdate', 'return': birthdate, 'field': 'birthdate' };
      if ( !validator.isBefore( birthdate ) ) return { 'error': 'back to the future?', 'return': birthdate, 'field': 'birthdate' };

      let date = birthdate.split( '-' );
      date = new Date( Date.UTC( date[ 0 ], date[ 1 ] - 1, date[ 2 ] ) );

      const databaseUpdate = { $set: { 'details.birthdate': date } };

      return { 'error': false, databaseUpdate };
    }, 'gender': async function ( req, res, userId, update ) {
      let gender = update.gender;
      if ( typeof gender != 'string' ) return { 'error': 'gender is not a string', 'return': gender, 'field': 'gender' };

      // Validates gender according to following rules: is an integer between 0 and 3.
      if ( !validator.isInt( gender, { min: 0, max: 3 } ) ) return { 'error': 'gender is malformed', 'return': gender, 'field': 'gender' };
      gender = parseInt( gender );

      const databaseUpdate = { $set: { 'details.gender': gender } };

      return { 'error': false, databaseUpdate };
    }, 'profilePicture': async function ( req, res, userId, update ) {
      if ( !req.files && !req.files.profilePicture ) return { 'error': 'no files uploaded' };

      const profilePictureBuffer = req.files.profilePicture.data;
      const pictureValidation = await validateProfilePicture( profilePictureBuffer, req.files.profilePicture.truncated );

      if ( pictureValidation.error ) return { 'error': pictureValidation.reason, 'field': 'profilePicture' };

      const databaseUpdate = { $set: { 'details.profilePicture': profilePictureBuffer } };

      return { 'error': false, databaseUpdate };
    }, 'school': async function ( req, res, userId, update ) {
      let school = update.school;
      if ( typeof school != 'string' ) return { 'error': 'school is not a string', 'return': school, 'field': 'school' };

      // Validates gender according to following rules: is an integer between 0 and 3.
      if ( !validator.isLength( school, { min: 3, max: 86 } ) ) return { 'error': 'school is not in length range 3-86', 'return': school, 'field': 'school' };

      school = school.toLowerCase().split( ' ' ).filter( n => n ).map( ( s ) => ( [].indexOf( s ) === -1 ) ? s.charAt( 0 ).toUpperCase() + s.substring( 1 ) : s ).join( ' ' );

      const databaseUpdate = { $set: { 'details.school': school } };

      return { 'error': false, databaseUpdate };
    }, 'city': async function ( req, res, userId, update ) {
      let city = update.city;
      if ( typeof city != 'string' ) return { 'error': 'city is not a string', 'return': city, 'field': 'city' };

      // Validates gender according to following rules: is an integer between 0 and 3.
      if ( !validator.isLength( city, { min: 3, max: 86 } ) ) return { 'error': 'city is not in length range 3-86', 'return': city, 'field': 'city' };

      city = city.toLowerCase().split( ' ' ).filter( n => n ).map( ( s ) => ( [].indexOf( s ) === -1 ) ? s.charAt( 0 ).toUpperCase() + s.substring( 1 ) : s ).join( ' ' );

      const databaseUpdate = { $set: { 'details.city': city } };

      return { 'error': false, databaseUpdate };
    }, 'company': async function ( req, res, userId, update ) {
      let company = update.company;
      if ( typeof company != 'string' ) return { 'error': 'company is not a string', 'return': company, 'field': 'company' };

      // Validates gender according to following rules: is an integer between 0 and 3.
      if ( !validator.isLength( company, { min: 3, max: 86 } ) ) return { 'error': 'company is not in length range 3-86', 'return': company, 'field': 'company' };

      company = company.toLowerCase().split( ' ' ).filter( n => n ).map( ( s ) => ( [].indexOf( s ) === -1 ) ? s.charAt( 0 ).toUpperCase() + s.substring( 1 ) : s ).join( ' ' );

      const databaseUpdate = { $set: { 'details.company': company } };

      return { 'error': false, databaseUpdate };
    }, 'phoneNumber': async function ( req, res, userId, update ) {
      let phoneNumber = update.phoneNumber;
      if ( typeof phoneNumber != 'string' ) return { 'error': 'phoneNumber is not a string', 'return': phoneNumber, 'field': 'phoneNumber' };

      // Validates gender according to following rules: is an integer between 0 and 3.
      if ( !validator.isMobilePhone( phoneNumber, validator.isMobilePhoneLocales, { 'strictMode': true } ) ) return { 'error': 'phoneNumber is malformed. must contain country code', 'return': phoneNumber, 'field': 'phoneNumber' };

      const databaseUpdate = { $set: { 'details.phoneNumber': phoneNumber } };

      return { 'error': false, databaseUpdate };
    }, 'personalNumber': async function ( req, res, userId, update ) {
      let personalNumber = update.personalNumber;
      if ( typeof personalNumber != 'string' ) return { 'error': 'personalNumber is not a string', 'return': personalNumber, 'field': 'personalNumber' };

      const personnummerValidation = personnummer.parse( personalNumber, { strict: true } );
      // Validates gender according to following rules: is an integer between 0 and 3.
      if ( !personnummerValidation.valid ) return { 'error': 'personalNumber is malformed', 'return': personalNumber, 'field': 'personalNumber' };

      const databaseUpdate = { $set: { 'details.personalNumber': personnummerValidation.normalised } };

      return { 'error': false, databaseUpdate };
    }, 'publicKey': async function ( req, res, userId, update ) {
      let publicKey = update.publicKey;
      if ( typeof publicKey != 'string' ) return { 'error': 'publicKey is not a string', 'return': publicKey, 'field': 'publicKey' };

      // Validates gender according to following rules: is an integer between 0 and 3.
      if ( !validator.isLength( publicKey, { min: 100, max: 1000 } ) ) return { 'error': 'publicKey is not in length range 100-1000', 'return': publicKey, 'field': 'publicKey' };

      const databaseUpdate = { $set: { 'details.publicKey': publicKey } };

      return { 'error': false, databaseUpdate };
    }, 'address': async function ( req, res, userId, update ) {
      let city = update.city;
      let postalCode = update.postalCode;
      let address = update.address;

      if ( typeof city != 'string' || typeof postalCode != 'string' || typeof address != 'string' ) return { 'error': 'only accepts strings', 'return': update, 'field': 'update' };

      // Validates gender according to following rules: is an integer between 0 and 3.
      if ( !validator.isPostalCode( postalCode, 'any' ) ) return { 'error': 'postalCode is malformed', 'return': postalCode, 'field': 'postalCode' };
      if ( !validator.isLength( city, { min: 3, max: 86 } ) ) return { 'error': 'city is not in length range 3-86', 'return': city, 'field': 'city' };
      if ( !validator.isLength( address, { min: 3, max: 86 } ) ) return { 'error': 'address is not in length range 3-86', 'return': address, 'field': 'address' };

      const addressObj = {
        'city': city,
        'postalCode': postalCode,
        'address': address
      };

      const databaseUpdate = { $set: { 'details.address': addressObj } };

      return { 'error': false, databaseUpdate };
    },
  },
  'settings': {
    'appearance': {
      'language': async function ( req, res, userId, update ) {
        const language = update.language;

        if ( typeof language != 'string' ) return { 'error': 'language is not a string', 'return': language, 'field': 'language' };

        if ( !validator.isIn( language, [ 'swedish', 'english' ] ) ) return { 'error': 'we only support swedish and english for now', 'return': language, 'field': 'language' };

        const databaseUpdate = { $set: { 'settings.appearance.language': language } };

        return { 'error': false, databaseUpdate };
      }, 'nightMode': async function ( req, res, userId, update ) {
        let nightMode = update.nightMode;

        if ( typeof nightMode != 'string' ) return { 'error': 'nightMode is not a string', 'return': nightMode, 'field': 'nightMode' };

        if ( !validator.isBoolean( nightMode ) ) return { 'error': 'nightMode is not boolean string', 'return': nightMode, 'field': 'nightMode' };

        nightMode = ( nightMode === 'true' );

        const databaseUpdate = { $set: { 'settings.appearance.nightMode': nightMode } };

        return { 'error': false, databaseUpdate };
      }, 'sort': async function ( req, res, userId, update ) {
        const sort = update.sort;

        if ( typeof sort != 'string' ) return { 'error': 'sort is not a string', 'return': sort, 'field': 'sort' };

        if ( !validator.isIn( sort, [ 'new', 'top' ] ) ) return { 'error': 'we only support new and top for now', 'return': sort, 'field': 'sort' };

        const databaseUpdate = { $set: { 'settings.appearance.sort': sort } };

        return { 'error': false, databaseUpdate };
      }, 'display': async function ( req, res, userId, update ) {
        const display = update.display;

        if ( typeof display != 'string' ) return { 'error': 'display is not a string', 'return': display, 'field': 'display' };

        if ( !validator.isIn( display, [ 'default', 'cozy', 'compact' ] ) ) return { 'error': 'we only support new and top for now', 'return': display, 'field': 'display' };

        const databaseUpdate = { $set: { 'settings.appearance.display': display } };

        return { 'error': false, databaseUpdate };
      }, 'newTab': async function ( req, res, userId, update ) {
        let newTab = update.newTab;

        if ( typeof newTab != 'string' ) return { 'error': 'newTab is not a string', 'return': newTab, 'field': 'newTab' };

        if ( !validator.isBoolean( newTab ) ) return { 'error': 'newTab is not boolean string', 'return': newTab, 'field': 'newTab' };

        newTab = ( newTab === 'true' );

        const databaseUpdate = { $set: { 'settings.appearance.newTab': newTab } };

        return { 'error': false, databaseUpdate };
      },
    },
    'notifications': {},
    'privacy': {
      'displayName': async function ( req, res, userId, update ) {
          const displayName = update.displayName;

          if ( typeof displayName != 'string' ) return { 'error': 'displayName is not a string', 'return': displayName, 'field': 'displayName' };

          if ( !validator.isIn( displayName, [ 'name', 'username' ] ) ) return { 'error': 'we only support name and username for now', 'return': displayName, 'field': 'displayName' };

          const databaseUpdate = { $set: { 'settings.privacy.displayName': displayName } };

          return { 'error': false, databaseUpdate };
        },
        'securityHistory': async function ( req, res, userId, update ) {
          let securityHistory = update.securityHistory;

          if ( typeof securityHistory != 'string' ) return { 'error': 'securityHistory is not a string', 'return': securityHistory, 'field': 'securityHistory' };

          if ( !validator.isBoolean( securityHistory ) ) return { 'error': 'securityHistory is not boolean string', 'return': securityHistory, 'field': 'securityHistory' };

          securityHistory = ( securityHistory === 'true' );

          const databaseUpdate = { $set: { 'settings.privacy.securityHistory': securityHistory } };

          return { 'error': false, databaseUpdate };
        },
    }
  },
  'profile': {
    'badges': async function ( req, res, userId, update ) {
      const badges = update.badges;

      if ( !Array.isArray( badges ) ) return { 'error': 'badges is not an array', 'return': badges, 'field': 'badges' };
      if ( badges.length > 3 ) return { 'error': 'too many badges', 'return': badges, 'field': 'badges' };
      for ( let badge of badges ) {
        if ( !validateObjectID( badge ) ) return { 'error': 'badge is not an objectID', 'return': badge, 'field': 'badges' };
      }

      if ( badges.length > 0 && !( await checkBadges( badges ) ).valid ) return { 'error': 'unauthorised to use that/those badges', 'return': badges, 'field': 'badges' };

      const databaseUpdate = { $set: { 'profile.badges': badges } };

      return { 'error': false, databaseUpdate };
    }, 'colour': async function ( req, res, userId, update ) {
      const colour = update.colour;

      if ( typeof colour != 'string' ) return { 'error': 'colour is not a string', 'return': colour, 'field': 'colour' };

      if ( !validator.isHexColor( colour ) ) return { 'error': 'colour is not valid hex colour', 'return': colour, 'field': 'colour' };

      const databaseUpdate = { $set: { 'profile.colour': colour } };

      return { 'error': false, databaseUpdate };
    }, 'status': async function ( req, res, userId, update ) {
        const status = update.status;

        if ( typeof status != 'string' ) return { 'error': 'status is not a string', 'return': status, 'field': 'status' };

        if ( !validator.isLength( status, { min: 3, max: 32 } ) ) return { 'error': 'status is not in length range 3-32', 'return': status, 'field': 'status' };

        const databaseUpdate = { $set: { 'profile.status': status } };

        return { 'error': false, databaseUpdate };
      },
      'bio': async function ( req, res, userId, update ) {
          const bio = update.bio;

          if ( typeof bio != 'string' ) return { 'error': 'bio is not a string', 'return': bio, 'field': 'bio' };

          if ( !validator.isLength( bio, { min: 3, max: 1000 } ) ) return { 'error': 'bio is not in length range 3-1000', 'return': bio, 'field': 'bio' };

          const databaseUpdate = { $set: { 'profile.bio': bio } };

          return { 'error': false, databaseUpdate };
        },
        'url': async function ( req, res, userId, update ) {
          const url = update.url;

          if ( typeof url != 'string' ) return { 'error': 'url is not a string', 'return': url, 'field': 'url' };

          if ( !validator.isURL( url, { protocols: [ 'http', 'https' ] } ) ) return { 'error': 'url is an url', 'return': url, 'field': 'url' };

          const databaseUpdate = { $set: { 'profile.url': url } };

          return { 'error': false, databaseUpdate };
        },
  },
};

module.exports.set = async function ( req, res ) {
  const userId = req.user;
  const setting = req.body.setting.split( '.' );
  const update = req.body.update;
  let func = validate;

  for ( let category of setting ) {
    func = func[ category ];
    if ( !func ) return res.send( { 'type': 'fail', 'reason': 'setting does not exist', 'return': setting.join( '.' ) } );
  }

  if ( typeof func !== 'function' ) return res.send( { 'type': 'fail', 'reason': 'setting does not exist', 'return': setting.join( '.' ), 'field': 'setting' } );
  if ( typeof update !== 'object' || update === null ) return res.send( { 'type': 'fail', 'reason': 'update is not an object', 'return': update, 'field': 'update' } );
  const status = await func( req, res, userId, update );

  if ( status.error ) {
    return res.send( {
      'type': 'fail',
      'reason': status.error,
      'return': status.return,
      'field': status.field
    } );
  } else {
    if ( status.databaseUpdate ) await userSet( userId, status.databaseUpdate );
    return res.send( {
      'type': 'success'
    } );
  }
};