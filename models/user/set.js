/* global db */

const ObjectID = require( 'mongodb' ).ObjectID;

module.exports.setProfilePicture = async function( id, buffer ) {
  return ( await db.collection( 'users' ).updateOne( { '_id': ObjectID( id ) }, { '$set': { 'profilePicture': buffer } } ) );
};