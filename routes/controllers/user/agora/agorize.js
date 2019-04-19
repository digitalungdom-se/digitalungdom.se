/* global include */

const validator = require( 'validator' );
const validateObjectID = require( 'mongodb' ).ObjectID.isValid;

const checkGroup = include( 'models/check' ).checkGroup;
const checkBadges = include( 'models/check' ).checkBadges;
const checkHypagora = include( 'models/check' ).checkHypagora;

const agorize = include( 'models/user/agora' ).agorize;

module.exports.agorize = async function ( req, res ) {
  const validateQueryArray = [];
  // Fetches all the fields and their values
  const id = req.user;
  const body = req.body.body;
  const type = req.body.type;
  const role = req.body.role;
  // Is not required
  let badges = req.body.badges;

  // Post specific
  const title = req.body.title;
  const tags = req.body.tags;
  let hypagora = req.body.hypagora;

  // Comment specific
  const replyTo = req.body.replyTo;

  let display = { 'type': 'user', 'display': null };

  // Checks that they all are strings, validatorjs only allows string (prevent errors)
  if ( typeof body !== 'string' || typeof type !== 'string' || typeof role !== 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'only strings are accepted' } );
  if ( !validator.isIn( type, [ 'text', 'comment', 'link', 'question' ] ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'you can only post a (text|comment|link|question)', 'typeVariable': type } );
  if ( !validator.isLength( body, { min: 0, max: 10000 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'body is too long', body } );

  if ( role !== 'user' ) {
    if ( !validateObjectID( role ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'role is not an objectID', role } );
    validateQueryArray.push( checkGroup( id, role ) );

    display[ 'type' ] = 'role';
    display[ 'display' ] = role;
  } else if ( Array.isArray( badges ) && badges.length !== 0 ) {
    for ( let badge of badges ) {
      if ( !validateObjectID( badge ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'badge is not an objectID', badge } );
    }
    validateQueryArray.push( checkBadges( id, badges ) );

    display[ 'type' ] = 'badges';
    display[ 'display' ] = badges;
  }

  // Specific validation
  if ( type === 'text' || type === 'question' || type === 'link' ) {
    if ( validateObjectID( hypagora ) ) {
      validateQueryArray.push( checkHypagora );
    } else {
      hypagora = 'general';
    }

    if ( !Array.isArray( tags ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'tags has to be an array', tags } );
    if ( tags.length > 10 ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'too many tags, max 10', tags } );
    for ( let tag of tags ) {
      if ( typeof tag !== 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'only strings allowed for tags', tag } );
      if ( !validator.isLength( tag, { min: 3, max: 32 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'tag is too long/short', tag } );
    }

    if ( type === 'text' || type === 'question' ) {
      if ( typeof title != 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'only strings are accepted', title } );
      if ( !validator.isLength( title, { min: 3, max: 100 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'title is too long/short', title } );
    } else {
      if ( !validator.isURL( body, { protocols: [ 'http', 'https' ] } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'link posts may only be links', body } );
    }
  } else if ( type === 'comment' ) {
    if ( !validateObjectID( replyTo ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'replyTo is not an objectID', replyTo } );
  }

  const validArray = await Promise.all( validateQueryArray );
  for ( let check of validArray ) {
    if ( !check.valid ) return res.status( 400 ).send( { 'type': 'fail', 'reason': check.reason, 'checked': check.checked } );
  }

  const status = await agorize( id, { 'general': { body, type, display }, 'comment': { replyTo }, 'post': { title, tags, hypagora } } );

  if ( status.error ) {
    return res.status( 500 ).send( { 'type': 'fail', 'reason': status.error } );
  } else {
    return res.status( 201 ).send( { 'type': 'success' } );
  }
};