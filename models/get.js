/* global db */

const ObjectID = require( 'mongodb' ).ObjectID;

module.exports.getAgreementVersion = async function () {
  /** This function will be used to get latest agreement (bylaws and GDPR included) when registering and logging in.
  It retrieves the latest agreement and returns it. This can be later used to put in the users document (registering) or check that
  they have accepted the latest agreement when logging in. **/

  const agreementVersion = ( await db.collection( 'agreements' ).find( { 'type': 'digitalungdom' }, { '_id': 0, 'agreementVersion': 1 } ).sort( { _id: -1 } ).limit( 1 ).toArray() )[ 0 ].agreementVersion;

  return agreementVersion;
};

module.exports.getPublicUserById = async function ( userIdArray ) {
  userIdArray = userIdArray.map( id => ObjectID( id ) );

  const user = await db.collection( 'users' ).find( { '_id': { $in: userIdArray } }, {
    'projection': {
      'details.name': 1,
      'details.username': 1,
      'details.profilePicture': 1
    }
  } ).toArray();

  return user;
};

module.exports.getPublicUserByUsername = async function ( usernameArray ) {
  const user = await db.collection( 'users' ).find( { 'details.username': { $in: usernameArray } }, {
    'projection': {
      'details.name': 1,
      'details.username': 1,
      'details.profilePicture': 1
    }
  } ).collation( { locale: 'en', strength: 2 } ).toArray();

  return user;
};

module.exports.getUserById = async function ( id ) {
  const user = await db.collection( 'users' ).findOne( { '_id': ObjectID( id ) }, { 'projection': { 'verificationToken': 0, 'resetPassword': 0 } } );

  return user;
};

module.exports.getUserByEmail = async function ( email ) {
  const user = await db.collection( 'users' ).findOne( { 'details.email': email }, { 'projection': { 'verificationToken': 0, 'resetPassword': 0 } } );

  return user;
};

module.exports.getUserByUsername = async function ( username ) {
  const user = ( await db.collection( 'users' ).find( { 'details.username': username }, { 'projection': { 'verificationToken': 0, 'resetPassword': 0 } } ).collation( { locale: 'en', strength: 2 } ).toArray() )[ 0 ];

  return user;
};

module.exports.getUserRolesById = async function ( id ) {
  const roles = ( await db.collection( 'users' ).findOne( { '_id': ObjectID( id ) }, { 'projection': { '_id': 0, 'agora.roles': 1 } } ) ).roles;

  return roles;
};

module.exports.getMemberAmount = async function () {
  const memberAmount = await db.collection( 'users' ).count();

  return memberAmount;
};