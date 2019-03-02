const validateObjectID = require( 'mongodb' ).ObjectID.isValid;
const validator = require( 'validator' );

const getAgoragrams = require( './../../../models/user/agora' ).getAgoragrams;

module.exports.getAgoragrams = async function( req, res ) {
  let dateAfter = req.query.dateAfter;
  let dateBefore = req.query.dateBefore;
  const sort = req.query.sort;

  // Checks that they all are strings, validatorjs only allows string (prevent errors)
  if ( typeof sort !== 'string' || typeof dateAfter !== 'string' || typeof dateBefore !== 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Only strings are accepted' } );

  if ( !validator.isHexadecimal( dateAfter ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Time must be hexadecimal seconds since unix epoch', dateAfter } );
  if ( dateAfter.length > 8 ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Time must be hexadecimal seconds since unix epoch', dateAfter } );

  if ( !validator.isHexadecimal( dateBefore ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Time must be hexadecimal seconds since unix epoch)', dateBefore } );
  if ( dateBefore.length > 8 ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Time must be hexadecimal seconds since unix epoch', dateBefore } );

  if ( !validator.isIn( sort, [ 'new', 'top', 'question' ] ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'You can only post a (post|comment|link|question)', sort } );

  dateAfter = dateAfter.length < 8 ? '0'.repeat( 8 - dateAfter.length ) + dateAfter : dateAfter;
  dateBefore = dateBefore.length < 8 ? '0'.repeat( 8 - dateBefore.length ) + dateBefore : dateBefore;

  const posts = await getAgoragrams( dateAfter, dateBefore, sort );
  if ( Array.isArray( posts ) ) return res.send( { 'type': 'success', posts } );
  else return res.status( 500 ).send( { 'type': 'fail', 'reason': 'internal server error' } );
}