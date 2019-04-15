/* global include */

const validator = require( 'validator' );
const validateObjectID = require( 'mongodb' ).ObjectID.isValid;

const metaAgorize = include( 'models/user/agora' ).metaAgorize;

module.exports.metaAgorize = async function ( req, res ) {
  // Fetches all the fields and their values
  const id = req.user;
  const postId = req.body.postId;
  const body = req.body.body;

  // Checks that they all are strings, validatorjs only allows string (prevent errors)
  if ( typeof body !== 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Only strings are accepted' } );
  if ( !validateObjectID( postId ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'postId is not an objectID', postId } );
  if ( !validator.isLength( body, { min: 0, max: 10000 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Body is too long', body } );

  const exists = await metaAgorize( id, postId, { body } );
  if ( exists ) return res.status( 201 ).send( { 'type': 'success' } );
  else return res.status( 404 ).send( { 'type': 'failed', 'reason': 'no post with that id', postId } );
};