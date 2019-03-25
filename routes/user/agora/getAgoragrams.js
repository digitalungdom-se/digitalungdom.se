const validateObjectID = require( 'mongodb' ).ObjectID.isValid;
const validator = require( 'validator' );

const getAgoragrams = require( 'models/user/agora' ).getAgoragrams;
const getAgoragram = require( 'models/user/agora' ).getAgoragram;

module.exports.getAgoragrams = async function( req, res ) {
  const id = req.user;
  let dateAfter = req.query.dateAfter;
  let dateBefore = req.query.dateBefore;
  const sort = req.query.sort;

  // Checks that they all are strings, validatorjs only allows string (prevent errors)
  if ( typeof sort !== 'string' || typeof dateAfter !== 'string' || typeof dateBefore !== 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Only strings are accepted' } );

  if ( !validator.isHexadecimal( dateAfter ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Time must be hexadecimal seconds since unix epoch', dateAfter } );
  if ( dateAfter.length > 8 ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Time must be hexadecimal seconds since unix epoch', dateAfter } );

  if ( !validator.isHexadecimal( dateBefore ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Time must be hexadecimal seconds since unix epoch)', dateBefore } );
  if ( dateBefore.length > 8 ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Time must be hexadecimal seconds since unix epoch', dateBefore } );

  if ( !validator.isIn( sort, [ 'new', 'top' ] ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'You can sort by new|top', sort } );

  dateAfter = dateAfter.length < 8 ? '0'.repeat( 8 - dateAfter.length ) + dateAfter : dateAfter;
  dateBefore = dateBefore.length < 8 ? '0'.repeat( 8 - dateBefore.length ) + dateBefore : dateBefore;

  if ( id && !validateObjectID( id ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'invalid user id', id } );

  const posts = await getAgoragrams( dateAfter, dateBefore, sort, id );
  if ( Array.isArray( posts ) ) return res.send( { 'type': 'success', posts } );
  else return res.status( 500 ).send( { 'type': 'fail', 'reason': 'internal server error' } );
};

module.exports.getAgoragram = async function( req, res ) {
  const id = req.user;
  const postId = req.query.postId;

  // Checks that postId is an ObjectID
  if ( !validateObjectID( postId ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Invalid postId', postId } );
  if ( id && !validateObjectID( id ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'invalid user id', id } );

  const post = await getAgoragram( postId, id );
  if ( Array.isArray( post ) ) return res.send( { 'type': 'success', post } );
  else return res.status( 500 ).send( { 'type': 'fail', 'reason': 'internal server error' } );
};