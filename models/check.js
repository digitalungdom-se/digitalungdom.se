const MongoClient = require( 'mongodb' ).MongoClient;
const ObjectID = require( 'mongodb' ).ObjectID;
const validator = require( 'validator' );

module.exports.checkUsername = async function( database, user ) {
  user = user.toLowerCase();

  const userExists = await database.collection( 'users' ).findOne( { 'usernameLower': user }, { 'projection': { '_id': 1 } } );

  if ( userExists ) return false
  else return true;
}

module.exports.checkEmail = async function( database, email ) {
  email = validator.normalizeEmail( email );

  const userExists = await database.collection( 'users' ).findOne( { 'email': email }, { 'projection': { '_id': 1 } } );

  if ( userExists ) return false
  else return true;
}

module.exports.checkAgreementVersion = async function( database ) {
  const agreementVersion = await database.collection( 'agreements' ).findOne( { '$query': {}, '$orderby': { 'agreementVersion': -1 } } );

  return agreementVersion;
}