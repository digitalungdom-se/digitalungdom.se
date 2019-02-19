const MongoClient = require( 'mongodb' ).MongoClient;
const ObjectID = require( 'mongodb' ).ObjectID;

module.exports.getAgreementVersion = async function( database ) {
  /** This function will be used to get latest agreement (bylaws and GDPR included) when registering and logging in.
  It retrieves the latest agreement and returns it. This can be later used to put in the users document (registering) or check that 
  they have accepted the latest agreement when logging in. **/

  const agreementVersion = await database.collection( 'agreements' ).findOne( { '$query': {}, '$orderby': { 'agreementVersion': -1 } }, { 'project': { '_id': 0, 'agreementVersion': 1 } } );

  return agreementVersion;
}

module.exports.getUserById = async function( database, id ) {
  const user = await database.collection( 'users' ).findOne( { '_id': ObjectID( id ) }, { 'projection': { '_id': 0, 'verificationToken': 0, 'resetPasswordToken': 0, 'resetPasswordExpires': 0 } } );

  return user;
}

module.exports.getUserByEmail = async function( database, email ) {
  const user = await database.collection( 'users' ).findOne( { 'email': email }, { 'projection': { 'verificationToken': 0, 'resetPasswordToken': 0, 'resetPasswordExpires': 0 } } );

  return user;
}

module.exports.getUserByUsername = async function( database, username ) {
  const user = await database.collection( 'users' ).findOne( { 'usernameLower': username.toLowerCase() }, { 'projection': { 'verificationToken': 0, 'resetPasswordToken': 0, 'resetPasswordExpires': 0 } } );

  return user;
}