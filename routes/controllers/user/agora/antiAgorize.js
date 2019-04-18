/* global include */

const validateObjectID = require( 'mongodb' ).ObjectID.isValid;

const antiAgorize = include( 'models/user/agora' ).antiAgorize;

module.exports.antiAgorize = async function ( req, res ) {
  // Fetches all the fields and their values
  const userId = req.user;
  const postId = req.body.postId;

  if ( !validateObjectID( postId ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'postId is not an objectID', postId } );

  const alreadyDeleted = await antiAgorize( userId, postId );

  if ( !alreadyDeleted ) return res.status( 201 ).send( { 'type': 'success' } );
  else if ( alreadyDeleted ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Agoragram already deleted', postId } );
  else return res.status( 400 ).send( { 'type': 'fail', 'reason': 'No such post or ', postId } );
};