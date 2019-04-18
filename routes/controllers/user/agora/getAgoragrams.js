/* global include */

const validateObjectID = require( 'mongodb' ).ObjectID.isValid;
const validator = require( 'validator' );

const getAgoragrams = include( 'models/user/agora' ).getAgoragrams;
const getAgoragram = include( 'models/user/agora' ).getAgoragram;

module.exports.getAgoragrams = async function ( req, res ) {
  const id = req.user;
  let dateAfter = req.query.dateAfter;
  let dateBefore = req.query.dateBefore;
  const sort = req.query.sort;
  const group = req.query.group;

  // Checks that they all are strings, validatorjs only allows string (prevent errors)
  if ( typeof sort !== 'string' || typeof dateAfter !== 'string' || typeof dateBefore !== 'string' || typeof group !== 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Only strings are accepted' } );

  if ( !validator.isHexadecimal( dateAfter ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Time must be hexadecimal seconds since unix epoch', dateAfter } );
  if ( dateAfter.length > 8 ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Time must be hexadecimal seconds since unix epoch', dateAfter } );

  if ( !validator.isHexadecimal( dateBefore ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Time must be hexadecimal seconds since unix epoch)', dateBefore } );
  if ( dateBefore.length > 8 ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Time must be hexadecimal seconds since unix epoch', dateBefore } );

  if ( !validator.isIn( sort, [ 'new', 'top' ] ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'You can sort by new|top', sort } );

  if ( !validator.isLength( group, { min: 3, max: 32 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Invalid group', group } );

  dateAfter = dateAfter.length < 8 ? '0'.repeat( 8 - dateAfter.length ) + dateAfter : dateAfter;
  dateBefore = dateBefore.length < 8 ? '0'.repeat( 8 - dateBefore.length ) + dateBefore : dateBefore;

  const posts = await getAgoragrams( dateAfter, dateBefore, sort, group, id );
  return res.send( { 'type': 'success', posts } );
};

module.exports.getAgoragram = async function ( req, res ) {
  const id = req.user;
  const postId = req.query.postId;

  // Checks that postId is an ObjectID
  // if ( !validateObjectID( postId ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Invalid postId', postId } );
  if ( id && !validateObjectID( id ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'invalid user id', id } );

  const post = await getAgoragram( postId, id );
  return res.send( { 'type': 'success', post } );
};