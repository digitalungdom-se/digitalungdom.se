/* global include */

const validateObjectID = require( 'mongodb' ).ObjectID.isValid;

const antiAgorize = include( 'models/user/agora' ).antiAgorize;

module.exports.antiAgorize = async function ( req, res ) {
  // Fetches all the fields and their values
  const userId = req.user;
  const postId = req.body.postId;

  if ( !validateObjectID( postId ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'postId is not an objectID', postId } );

  const status = await antiAgorize( userId, postId );

  if ( status.error ) {
    return res.send( {
      'type': 'fail',
      'reason': status.error,
      postId
    } );
  } else {
    return res.send( {
      'type': 'success'
    } );
  }
};