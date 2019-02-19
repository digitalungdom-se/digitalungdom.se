const MongoClient = require( 'mongodb' ).MongoClient;
const ObjectID = require( 'mongodb' ).ObjectID;
const validator = require( 'validator' );

module.exports.checkUsername = async function( database, user ) {
  /** This function should be replaced with collation that is available in the mongodb driver 3.4.
  The field 'username' should then be indexed using collation language 'en' and strength 2.
  Collation should then be added to the find function below and the field usernameLower can be removed.
  **/

  user = user.toLowerCase();

  const userExists = await database.collection( 'users' ).findOne( { 'usernameLower': user }, { 'projection': { '_id': 1 } } );

  if ( userExists ) return false
  else return true;
}

module.exports.checkEmail = async function( database, email ) {
  // Normalises the email using validatorjs. See documentation for exact normalisation rules
  email = validator.normalizeEmail( email );

  const userExists = await database.collection( 'users' ).findOne( { 'email': email }, { 'projection': { '_id': 1 } } );

  if ( userExists ) return false
  else return true;
}