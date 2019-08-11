/* global include */

const validateObjectID = require( 'mongodb' ).ObjectID.isValid;
const validator = require( 'validator' );

const getPublicUserById = include( 'models/get' ).getPublicUsersById;
const getPublicUserByUsername = include( 'models/get' ).getPublicUsersByUsername;
const getMemberAmount = include( 'models/get' ).getMemberAmount;

module.exports.getPublicUser = async function ( req, res ) {
  // error array, should be used in every controller to handle errors and return them to client
  const errors = [];
  const type = req.query.type;
  let userArray = req.query.userArray;
  if ( !userArray ) errors.push( { 'reason': 'userArray must be an array, it is in the name', 'fields': [ 'userArray' ], 'return': { userArray } } );
  if ( errors.length > 0 ) return res.status( 400 ).send( { 'type': 'fail', 'errors': errors } );
  userArray = userArray.split( ',' );
  let users;

  if ( !Array.isArray( userArray ) ) errors.push( { 'reason': 'userArray must be an array, it is in the name', 'fields': [ 'userArray' ], 'return': { userArray } } );

  if ( type === 'objectid' ) {
    // Validates userId to ensure that it is an objectId
    for ( let userId of userArray ) {
      if ( !validateObjectID( userId ) ) errors.push( { 'reason': 'invalid objectId user id', 'fields': [ 'userArray' ], 'return': { userId } } );
    }

    if ( errors.length > 0 ) return res.status( 400 ).send( { 'type': 'fail', 'errors': errors } );

    users = await getPublicUserById( userArray );
  } else if ( type === 'username' ) {
    // Validates username according to following rules: min 3 max 24 characters and only includes valid characters (A-Z, a-z, 0-9, and _)
    for ( let username of userArray ) {
      if ( !validator.isLength( username, { min: 3, max: 24 } ) ) errors.push( { 'reason': 'username length is either too long or too short', 'fields': [ 'userArray' ], 'return': { username } } );
      if ( !/^(\w+)$/.test( username ) ) errors.push( { 'reason': 'invalid characters in username', 'fields': [ 'userArray' ], 'return': { username } } );
    }

    if ( errors.length > 0 ) return res.status( 400 ).send( { 'type': 'fail', 'errors': errors } );

    users = await getPublicUserByUsername( userArray );
  } else {
    return res.status( 400 ).send( { 'type': 'fail', 'errors': [ { 'reason': 'type is not a valid type (objectid|username)', 'field': [ 'type' ], 'return': { type } } ] } );
  }

  if ( users.length > 0 ) {
    return res.send( { 'type': 'success', users } );
  } else {
    return res.send( { 'type': 'fail', 'errors': [ { 'reason': 'no such users', 'field': [ 'userArray' ], 'return': { userArray } } ] } );
  }
};

module.exports.status = async function ( req, res ) {
  const memberAmount = await getMemberAmount();
  const json = {
    'board': {
      'general': 'Jobbar på digitalungdom.se',
      'douglas': 'Jobbar på digitalungdom.se front-end',
      'kelvin': 'Klappar sin katt',
      'simon': 'Väntar på order från Kelvin'
    },
    'server': {
      'digitalungdom.se': 'online',
      'dub': 'online'
    },
    'members': {
      'amount': memberAmount
    }
  };
  return res.send( json );
};