/* global include */

const validator = require( 'validator' );
const validateObjectID = require( 'mongodb' ).ObjectID.isValid;

const metaAgorize = include( 'models/user/agora' ).metaAgorize;

module.exports.metaAgorize = async function ( req, res ) {
  // Fetches all the fields and their values
  const userId = req.user;
  const postId = req.body.postId;
  const body = req.body.body;

  // Checks that they all are strings, validatorjs only allows string (prevent errors)
  if ( typeof body !== 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Only strings are accepted' } );
  if ( !validateObjectID( postId ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'postId is not an objectID', postId } );
  if ( !validator.isLength( body, { min: 0, max: 10000 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Body is too long', body } );

  const status = await metaAgorize( userId, postId, body );

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