/* global include */

const validator = require( 'validator' );
const validateObjectID = require( 'mongodb' ).ObjectID.isValid;

const checkGroup = include( 'models/check' ).checkGroup;
const checkBadges = include( 'models/check' ).checkBadges;
const checkHypagora = include( 'models/check' ).checkHypagora;

// the controllers follow this order
// create a post
const agorize = include( 'models/user/agora' ).agorize;
// delete a post
const antiAgorize = include( 'models/user/agora' ).antiAgorize;
// star a post
const asteri = include( 'models/user/agora' ).asteri;
// edit a post
const metaAgorize = include( 'models/user/agora' ).metaAgorize;
// report a post
const report = include( 'models/user/agora' ).report;
// get posts (sort: new|top) (date: hex after unix to hex after unix)
const getAgoragrams = include( 'models/user/agora' ).getAgoragrams;
// get getAgoragram by shortId (its _id but 7 bytes)
const getAgoragramByShortId = include( 'models/user/agora' ).getAgoragramByShortId;

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

  if ( validateObjectID( role ) ) {
    validateQueryArray.push( checkGroup( id, role ) );

    display[ 'type' ] = 'role';
    display[ 'display' ] = role;

  } else if ( Array.isArray( badges ) && badges.length !== 0 ) {
    if ( badges.length > 3 ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'too many badges, max 3', badges } );
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

module.exports.antiAgorize = async function ( req, res ) {
  // Fetches all the fields and their values
  const userId = req.user;
  const postId = req.body.postId;

  if ( !validateObjectID( postId ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'postId is not an objectID', postId } );

  const status = await antiAgorize( userId, postId );

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

module.exports.asteri = async function ( req, res ) {
  // Fetches all the fields and their values
  const id = req.user;
  const postId = req.body.postId;

  if ( !validateObjectID( postId ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'postId is not an objectID', postId } );

  const status = await asteri( id, postId );

  if ( status.error ) {
    return res.send( {
      'type': 'fail',
      'reason': status.error,
      postId
    } );
  } else {
    return res.send( {
      'type': 'success',
      'action': status.action
    } );
  }
};

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

module.exports.report = async function ( req, res ) {
  // Fetches all the fields and their values
  const id = req.body.id;
  const reason = req.body.reason;
  const place = req.body.place;

  // Checks that they all are strings, validatorjs only allows string (prevent errors)
  if ( typeof id !== 'string' || typeof reason !== 'string' || typeof place !== 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'only strings are accepted' } );
  if ( !validateObjectID( id ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'postId is not an objectID', id } );
  if ( !validator.isLength( reason, { min: 0, max: 1000 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'reason is too long', 'message': reason } );
  if ( !validator.isIn( place, [ 'agoragram', 'user' ] ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'you can only report a (agoragram|profile)', place } );

  const status = await report( id, reason, place );

  if ( status.error ) {
    return res.send( {
      'type': 'fail',
      'reason': status.error,
      id
    } );
  } else {
    return res.send( {
      'type': 'success'
    } );
  }
};

module.exports.getAgoragrams = async function ( req, res ) {
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

  const posts = await getAgoragrams( dateAfter, dateBefore, sort, hypagora );
  return res.send( { 'type': 'success', posts } );
};

module.exports.getAgoragram = async function ( req, res ) {
  const shortId = req.query.shortId;

  if ( typeof shortId !== 'string' || shortId.length !== 7 ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Invalid shortId', shortId } );

  const post = await getAgoragramByShortId( shortId );
  return res.send( { 'type': 'success', post } );
};