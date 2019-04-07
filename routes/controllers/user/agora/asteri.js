/* global include */

const validateObjectID = require( 'mongodb' ).ObjectID.isValid;

const asteri = include( 'models/user/agora' ).asteri;

module.exports.asteri = async function( req, res ) {
  // Fetches all the fields and their values
  const id = req.user;
  const postId = req.body.postId;

  if ( !validateObjectID( postId ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'postId is not an objectID', postId } );

  const exists = await asteri( id, postId );
  if ( exists === false ) return res.status( 201 ).send( { 'type': 'success' } );
  else if ( exists === true ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Agoragram already deleted', postId } );
  else return res.status( 404 ).send( { 'type': 'fail', 'reason': 'No such post', postId } );
};