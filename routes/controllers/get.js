/* global include */

const validator = require( 'validator' );
const validateObjectID = require( 'mongodb' ).ObjectID.isValid;
const ObjectID = require( 'mongodb' ).ObjectID;

const getPublicUserByID = include( 'models/get' ).getPublicUserByID;
const getPublicUserByUsername = include( 'models/get' ).getPublicUserByUsername;
const getMemberAmount = include( 'models/get' ).getMemberAmount;

module.exports.getPublicUserById = async function ( req, res ) {
  const type = req.query.type;
  let userArray = req.query.userArray;
  let users;

  if ( !userArray ) return res.send( { 'type': 'fail', 'reason': 'userArray has to be an array', 'fields': [ 'userArray' ], 'return': { 'userArray': userArray } } );
  userArray = userArray.split( ',' );

  if ( type === 'objectid' ) {
    for ( const [ index, userID ] of userArray.entries() ) {
      if ( !userID || !validateObjectID( userID ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'invalid user id', 'fields': [ 'userArray' ], 'return': { 'userArray': userArray, 'user': userID } } );
      else userArray[ index ] = ObjectID( userID );
    }

    users = await getPublicUserByID( userArray );
  } else if ( type === 'username' ) {
    for ( const username of userArray ) {
      if ( !username || typeof username !== 'string' || !validator.isLength( username, { min: 3, max: 24 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'invalid username', 'fields': [ 'userArray' ], 'return': { 'userArray': userArray, 'user': username } } );
    }

    users = await getPublicUserByUsername( userArray );
  } else {
    return res.send( { 'type': 'fail', 'reason': 'invalid type', 'fields': [ 'type' ], 'return': { 'type': type } } );
  }

  if ( users.length !== 0 ) {
    return res.send( { 'type': 'success', users } );
  } else {
    return res.send( { 'type': 'fail', 'reason': 'no such users', 'fields': [ 'userArray' ], 'return': { 'userArray': userArray } } );
  }
};

module.exports.status = async function ( req, res ) {
  const memberAmount = await getMemberAmount();
  const json = {
    'type': 'success',
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