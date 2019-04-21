/* global db */

const ObjectID = require( 'mongodb' ).ObjectID;
const validator = require( 'validator' );

module.exports.checkUsername = async function ( username ) {
  const userExists = ( await db.collection( 'users' ).find( { 'details.username': username.toLowerCase() }, { 'projection': { '_id': 1 } } ).collation( { locale: 'en', strength: 2 } ).toArray() )[ 0 ];

  if ( userExists ) return { 'valid': false, 'field': 'username' };
  else return { 'valid': true, 'field': 'username' };
};

module.exports.checkEmail = async function ( email ) {
  // Normalises the email using validatorjs. See documentation for exact normalisation rules
  email = validator.normalizeEmail( email );

  const userExists = await db.collection( 'users' ).findOne( { 'details.email': email }, { 'projection': { '_id': 1 } } );

  if ( userExists ) return { 'valid': false, 'field': 'email' };
  else return { 'valid': true, 'field': 'email' };
};

module.exports.checkGroup = async function ( userId, roleId ) {
  // Validates that the user is authorised to use the candidate group
  userId = ObjectID( userId );
  const allowed = await db.collection( 'users' ).findOne( { '_id': userId, 'details.roles': roleId }, { 'projection': { '_id': 1 } } );

  if ( allowed ) return { 'valid': false, 'field': 'role', 'checked': roleId };
  else return { 'valid': true, 'field': 'role' };
};

module.exports.checkBadges = async function ( userId, badges ) {
  // Validates that the user is authorised to use the candidate badges
  userId = ObjectID( userId );
  const allowed = await db.collection( 'users' ).findOne( { '_id': userId, 'details.badges': { '$all': badges } }, { 'projection': { '_id': 1 } } );

  if ( allowed ) return { 'valid': false, 'field': 'badges', 'checked': badges };
  else return { 'valid': true, 'field': 'badges' };
};

module.exports.checkHypagora = async function ( hypagoraId ) {
  // Validates that the user is authorised to use the candidate badges
  hypagoraId = ObjectID( hypagoraId );
  const allowed = await db.collection( 'hypagora' ).findOne( { '_id': hypagoraId }, { 'projection': { '_id': 1 } } );

  if ( allowed ) return { 'valid': false, 'field': 'hypagora', 'checked': hypagoraId };
  else return { 'valid': true, 'field': 'hypagora' };
};