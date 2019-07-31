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
// get starred agoragrams for a list of agoragrams
const getStarredAgoragrams = include( 'models/user/agora' ).getStarredAgoragrams;
// get getAgoragram by shortID (its _id but 7 bytes)
const getAgoragramByShortID = include( 'models/user/agora' ).getAgoragramByShortID;
// get public users by array of objectID
const getPublicUsersByID = include( 'models/get' ).getPublicUsersByID;

module.exports.agorize = async function ( req, res ) {
  // error array, should be used in every controller to handle errors and return them to client
  const errors = [];
  const validateQueryArray = [];
  // Fetches all the fields and their values
  const userID = req.user;
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
  if ( typeof body !== 'string' || typeof type !== 'string' || typeof role !== 'string' ) errors.push( { 'reason': 'only strings are accepted', 'fields': [ 'body', 'type', 'role' ], 'return': { body, type, role } } );
  if ( !validator.isIn( type, [ 'text', 'comment', 'link', 'question' ] ) ) errors.push( { 'reason': 'you can only post a (text|comment|link|question)', 'fields': [ 'type' ], 'return': { type } } );
  if ( !validator.isLength( body, { min: 0, max: 10000 } ) ) errors.push( { 'reason': 'body is not in length range 0-10000', 'fields': [ 'body' ], 'return': { body } } );

  if ( validateObjectID( role ) ) {
    validateQueryArray.push( checkGroup( userID, role ) );

    display[ 'type' ] = 'role';
    display[ 'display' ] = role;

  } else if ( Array.isArray( badges ) && badges.length !== 0 ) {
    if ( badges.length > 3 ) errors.push( { 'reason': 'badges is not in length range 0-3', 'fields': [ 'badges' ], 'return': { badges } } );
    for ( let badge of badges ) {
      if ( !validateObjectID( badge ) ) errors.push( { 'reason': 'badges is not an objectID', 'fields': [ 'badges' ], 'return': { badges } } );
    }
    validateQueryArray.push( checkBadges( userID, badges ) );

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

    if ( !Array.isArray( tags ) ) errors.push( { 'reason': 'tags has to be an array', 'fields': [ 'tags' ], 'return': { tags } } );
    else if ( tags.length > 10 ) errors.push( { 'reason': 'too many tags, max 10', 'fields': [ 'tags' ], 'return': { tags } } );
    else {
      for ( let tag of tags ) {
        if ( typeof tag !== 'string' ) errors.push( { 'reason': 'only strings allowed for tags', 'fields': [ 'tags' ], 'return': { tags } } );
        if ( !validator.isLength( tag, { min: 3, max: 32 } ) ) errors.push( { 'reason': 'tag is not in length 3-32', 'fields': [ 'tags' ], 'return': { tags } } );
      }
    }

    if ( type === 'text' || type === 'question' ) {
      if ( typeof title != 'string' ) errors.push( { 'reason': 'only strings allowed for title', 'fields': [ 'title' ], 'return': { title } } );
      else if ( !validator.isLength( title, { min: 3, max: 100 } ) ) errors.push( { 'reason': 'title is not in length 3-100', 'fields': [ 'title' ], 'return': { title } } );
    } else {
      if ( !validator.isURL( body, { protocols: [ 'http', 'https' ] } ) ) errors.push( { 'reason': 'link posts may only be links', 'fields': [ 'body' ], 'return': { body } } );
    }
  } else if ( type === 'comment' ) {
    if ( !validateObjectID( replyTo ) ) errors.push( { 'reason': 'replyTo is not an objectID', 'fields': [ 'replyTo' ], 'return': { replyTo } } );
  }

  const validArray = await Promise.all( validateQueryArray );
  for ( let check of validArray ) {
    let error = { 'reason': check.reason, 'fields': [ check.field ] };
    error[ 'return' ][ check.field ] = check.return;
    if ( !check.valid ) errors.push( error );
  }

  const status = await agorize( userID, { 'general': { body, type, display }, 'comment': { replyTo }, 'post': { title, tags, hypagora } } );
  if ( status.error ) errors.push( { 'reason': status.error, 'fields': status.fields, 'return': status.return } );

  if ( errors.length > 0 ) return res.status( 400 ).send( { 'type': 'fail', 'errors': errors } );
  else return res.send( { 'type': 'success' } );
};

module.exports.antiAgorize = async function ( req, res ) {
  // error array, should be used in every controller to handle errors and return them to client
  const errors = [];
  // Fetches all the fields and their values
  const userID = req.user;
  const agoragramID = req.body.agoragramID;

  if ( !validateObjectID( agoragramID ) ) errors.push( { 'reason': 'agoragramID is not an objectID', 'fields': [ 'agoragramID' ], 'return': { agoragramID } } );

  const status = await antiAgorize( userID, agoragramID );
  if ( status.error ) errors.push( { 'reason': status.error, 'fields': status.fields, 'return': status.return } );

  if ( errors.length > 0 ) return res.status( 400 ).send( { 'type': 'fail', 'errors': errors } );
  else return res.send( { 'type': 'success' } );
};

module.exports.asteri = async function ( req, res ) {
  // error array, should be used in every controller to handle errors and return them to client
  const errors = [];
  // Fetches all the fields and their values
  const userID = req.user;
  const agoragramID = req.body.agoragramID;

  if ( !validateObjectID( agoragramID ) ) errors.push( { 'reason': 'agoragramID is not an objectID', 'fields': [ 'agoragramID' ], 'return': { agoragramID } } );

  const status = await asteri( userID, agoragramID );
  if ( status.error ) errors.push( { 'reason': status.error, 'fields': status.fields, 'return': status.return } );

  if ( errors.length > 0 ) return res.status( 400 ).send( { 'type': 'fail', 'errors': errors } );
  else return res.send( { 'type': 'success', 'action': status.action } );
};

module.exports.metaAgorize = async function ( req, res ) {
  // error array, should be used in every controller to handle errors and return them to client
  const errors = [];
  // Fetches all the fields and their values
  const userID = req.user;
  const agoragramID = req.body.agoragramID;
  const body = req.body.body;

  // Checks that they all are strings, validatorjs only allows string (prevent errors)
  if ( typeof body !== 'string' ) errors.push( { 'reason': 'only strings are accepted', 'fields': [ 'body' ], 'return': { body } } );
  if ( !validateObjectID( agoragramID ) ) errors.push( { 'reason': 'agoragramID is not an objectID', 'fields': [ 'agoragramID' ], 'return': { agoragramID } } );
  if ( !validator.isLength( body, { min: 0, max: 10000 } ) ) errors.push( { 'reason': 'body is not in length range 0-10000', 'fields': [ 'body' ], 'return': { body } } );

  const status = await metaAgorize( userID, agoragramID, body );
  if ( status.error ) errors.push( { 'reason': status.error, 'fields': status.fields, 'return': status.return } );

  if ( errors.length > 0 ) return res.status( 400 ).send( { 'type': 'fail', 'errors': errors } );
  else return res.send( { 'type': 'success' } );
};

module.exports.report = async function ( req, res ) {
  // error array, should be used in every controller to handle errors and return them to client
  const errors = [];
  // Fetches all the fields and their values
  const id = req.body.id;
  const reason = req.body.reason;
  const place = req.body.place;

  // Checks that they all are strings, validatorjs only allows string (prevent errors)
  if ( typeof id !== 'string' || typeof reason !== 'string' || typeof place !== 'string' ) errors.push( { 'reason': 'only strings are accepted', 'fields': [ 'id', 'reason', 'place' ], 'return': { id, reason, place } } );
  if ( !validateObjectID( id ) ) errors.push( { 'reason': 'id is not an objectID', 'fields': [ 'id' ], 'return': { id } } );
  if ( !validator.isLength( reason, { min: 0, max: 1000 } ) ) errors.push( { 'reason': 'reason is not in length range 0-10000', 'fields': [ 'reason' ], 'return': { reason } } );
  if ( !validator.isIn( place, [ 'agoragram', 'user' ] ) ) errors.push( { 'reason': 'you can only report a (agoragram|user)', 'fields': [ 'place' ], 'return': { place } } );

  const status = await report( id, reason, place );
  if ( status.error ) errors.push( { 'reason': status.error, 'fields': status.fields, 'return': status.return } );

  if ( errors.length > 0 ) return res.status( 400 ).send( { 'type': 'fail', 'errors': errors } );
  else return res.send( { 'type': 'success' } );
};

module.exports.getAgoragrams = async function ( req, res ) {
  // error array, should be used in every controller to handle errors and return them to client
  const errors = [];
  let dateAfter = req.query.dateAfter;
  let dateBefore = req.query.dateBefore;
  const sort = req.query.sort;
  let hypagora = req.query.hypagora;
  if ( !hypagora ) hypagora = 'general';

  // Checks that they all are strings, validatorjs only allows string (prevent errors)
  if ( typeof sort !== 'string' || typeof dateAfter !== 'string' || typeof dateBefore !== 'string' || typeof hypagora !== 'string' ) errors.push( { 'reason': 'only strings are accepted', 'fields': [ 'sort', 'dateAfter', 'dateBefore', 'hypagora' ], 'return': { sort, dateAfter, dateBefore, hypagora } } );

  if ( !validator.isHexadecimal( dateAfter ) || dateAfter.length > 8 ) errors.push( { 'reason': 'dateAfter must be hexadecimal seconds since unix epoch', 'fields': [ 'dateAfter' ], 'return': { dateAfter } } );
  if ( !validator.isHexadecimal( dateBefore ) || dateBefore.length > 8 ) errors.push( { 'reason': 'dateBefore must be hexadecimal seconds since unix epoch', 'fields': [ 'dateBefore' ], 'return': { dateBefore } } );

  if ( !validator.isIn( sort, [ 'new', 'top' ] ) ) errors.push( { 'reason': 'one can sort by new|top', 'fields': [ 'sort' ], 'return': { sort } } );

  if ( hypagora !== 'general' && !validateObjectID( hypagora ) ) errors.push( { 'reason': 'invalid hypagora', 'fields': [ 'hypagora' ], 'return': { hypagora } } );

  dateAfter = dateAfter.length < 8 ? '0'.repeat( 8 - dateAfter.length ) + dateAfter : dateAfter;
  dateBefore = dateBefore.length < 8 ? '0'.repeat( 8 - dateBefore.length ) + dateBefore : dateBefore;

  const agoragrams = await getAgoragrams( dateAfter, dateBefore, sort, hypagora );

  const queryArray = [];

  const userIDArray = agoragrams.map( agoragram => agoragram[ 'author' ] );
  queryArray.push( getPublicUsersByID( userIDArray ) );

  if ( req.user ) {
    const agoragramsIDs = agoragrams.map( agoragram => agoragram[ '_id' ] );

    queryArray.push( getStarredAgoragrams( req.user, agoragramsIDs ) );
  }

  const [ users, starredAgoragrams ] = await Promise.all( queryArray );

  if ( errors.length > 0 ) return res.status( 400 ).send( { 'type': 'fail', 'errors': errors } );
  else return res.send( { 'type': 'success', agoragrams, users, starredAgoragrams } );
};

module.exports.getAgoragram = async function ( req, res ) {
  // error array, should be used in every controller to handle errors and return them to client
  const errors = [];
  const agoragramShortID = req.query.agoragramShortID;

  if ( typeof agoragramShortID !== 'string' || agoragramShortID.length !== 7 ) errors.push( { 'reason': 'invalid agoragramShortID', 'fields': [ 'agoragramShortID' ], 'return': { agoragramShortID } } );

  const agoragrams = await getAgoragramByShortID( agoragramShortID );

  const queryArray = [];

  const userIDArray = agoragrams.map( agoragram => agoragram[ 'author' ] );
  queryArray.push( getPublicUsersByID( userIDArray ) );

  if ( req.user ) {
    const agoragramsIDs = agoragrams.map( agoragram => agoragram[ '_id' ] );

    queryArray.push( getStarredAgoragrams( req.user, agoragramsIDs ) );
  }

  const [ users, starredAgoragrams ] = await Promise.all( queryArray );

  if ( errors.length > 0 ) return res.status( 400 ).send( { 'type': 'fail', 'errors': errors } );
  else return res.send( { 'type': 'success', agoragrams, users, starredAgoragrams } );
};