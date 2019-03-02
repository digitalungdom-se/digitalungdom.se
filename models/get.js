/* global db */

const ObjectID = require( 'mongodb' ).ObjectID;

module.exports.getAgreementVersion = async function() {
  /** This function will be used to get latest agreement (bylaws and GDPR included) when registering and logging in.
  It retrieves the latest agreement and returns it. This can be later used to put in the users document (registering) or check that
  they have accepted the latest agreement when logging in. **/

  const agreementVersion = await db.collection( 'agreements' ).findOne( { '$query': {}, '$orderby': { 'agreementVersion': -1 } }, { 'project': { '_id': 0, 'agreementVersion': 1 } } );

  return agreementVersion;
}

module.exports.getUserById = async function( id ) {
  const user = await db.collection( 'users' ).findOne( { '_id': ObjectID( id ) }, { 'projection': { '_id': 0, 'verificationToken': 0, 'resetPasswordToken': 0, 'resetPasswordExpires': 0 } } );

  return user;
}

module.exports.getUserByEmail = async function( email ) {
  const user = await db.collection( 'users' ).findOne( { 'email': email }, { 'projection': { 'verificationToken': 0, 'resetPasswordToken': 0, 'resetPasswordExpires': 0 } } );

  return user;
}

module.exports.getUserByUsername = async function( username ) {
  const user = await db.collection( 'users' ).findOne( { 'usernameLower': username.toLowerCase() }, { 'projection': { 'verificationToken': 0, 'resetPasswordToken': 0, 'resetPasswordExpires': 0 } } );

  return user;
}

module.exports.getUserRolesById = async function( id ) {
  const user = await db.collection( 'users' ).findOne( { '_id': ObjectID( id ) }, { 'projection': { '_id': 0, 'roles': 1 } } );

  return user.roles;
}

module.exports.getRoleIdByName = async function( name ) {
  const user = await db.collection( 'roles' ).findOne( { 'name': name }, { 'projection': { '_id': 1 } } );

  return user.roles;
}