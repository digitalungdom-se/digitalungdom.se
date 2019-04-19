/* global include */

const validateObjectID = require( 'mongodb' ).ObjectID.isValid;
const validator = require( 'validator' );

const getAgoragrams = include( 'models/user/agora' ).getAgoragrams;
const getAgoragramByShortId = include( 'models/user/agora' ).getAgoragramByShortId;

module.exports.getAgoragrams = async function ( req, res ) {
  const id = req.user;
  let dateAfter = req.query.dateAfter;
  let dateBefore = req.query.dateBefore;
  const sort = req.query.sort;
  const hypagora = req.query.hypagora;

  // Checks that they all are strings, validatorjs only allows string (prevent errors)
  if ( typeof sort !== 'string' || typeof dateAfter !== 'string' || typeof dateBefore !== 'string' || typeof hypagora !== 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Only strings are accepted' } );

  if ( !validator.isHexadecimal( dateAfter ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Time must be hexadecimal seconds since unix epoch', dateAfter } );
  if ( dateAfter.length > 8 ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Time must be hexadecimal seconds since unix epoch', dateAfter } );

  if ( !validator.isHexadecimal( dateBefore ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Time must be hexadecimal seconds since unix epoch)', dateBefore } );
  if ( dateBefore.length > 8 ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Time must be hexadecimal seconds since unix epoch', dateBefore } );

  if ( !validator.isIn( sort, [ 'new', 'top' ] ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'You can sort by new|top', sort } );

  if ( !validator.isLength( hypagora, { min: 3, max: 32 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Invalid hypagora', hypagora } );

  dateAfter = dateAfter.length < 8 ? '0'.repeat( 8 - dateAfter.length ) + dateAfter : dateAfter;
  dateBefore = dateBefore.length < 8 ? '0'.repeat( 8 - dateBefore.length ) + dateBefore : dateBefore;

  const posts = await getAgoragrams( dateAfter, dateBefore, sort, hypagora, id );
  return res.send( { 'type': 'success', posts } );
};

module.exports.getAgoragram = async function ( req, res ) {
  const id = req.user;
  const postId = req.query.postId;

  if ( typeof postId !== 'string' && postId.length !== 14 && !validator.isHexadecimal( postId ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Invalid postId', postId } );

  const post = await getAgoragramByShortId( postId, id );
  return res.send( { 'type': 'success', post } );
};