/* global include */

const validateObjectID = require( 'mongodb' ).ObjectID.isValid;

const antiAgorize = include( 'models/user/agora' ).antiAgorize;
const validateAuthorById = include( 'models/user/agora' ).validateAuthorById;

module.exports.antiAgorize = async function( req, res ) {
  // Fetches all the fields and their values
  const id = req.user;
  const postId = req.body.postId;

  if ( !validateObjectID( postId ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'postId is not an objectID', postId } );

  if ( await validateAuthorById( id, postId ) ) {
    const exists = await antiAgorize( postId );
    if ( exists === false ) return res.status( 201 ).send( { 'type': 'success' } );
    else if ( exists === true ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Agoragram already deleted', postId } );
    else return res.status( 404 ).send( { 'type': 'fail', 'reason': 'No such post', postId } );
  } else {
    return res.status( 403 ).send( { 'type': 'fail', 'reason': 'not authorised to edit this post', postId } );
  }
};