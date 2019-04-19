/* global include */

const validateObjectID = require( 'mongodb' ).ObjectID.isValid;
const validator = require( 'validator' );

const getPublicUserById = include( 'models/get' ).getPublicUserById;
const getPublicUserByUsername = include( 'models/get' ).getPublicUserByUsername;
const getMemberAmount = include( 'models/get' ).getMemberAmount;

module.exports.getPublicUser = async function ( req, res ) {
  const type = req.query.type;
  const userArray = req.query.userArray.split( ',' );
  let user;

  if ( !Array.isArray( userArray ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'userArray must be an array, it is in the name', 'return': userArray } );

  if ( type === 'objectid' ) {
    // Validates userId to ensure that it is an objectId
    for ( let userId of userArray ) {
      if ( !validateObjectID( userId ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'invalid objectId user id', 'return': userId } );
    }

    user = await getPublicUserById( userArray );
  } else if ( type === 'username' ) {
    // Validates username according to following rules: min 3 max 24 characters and only includes valid characters (A-Z, a-z, 0-9, and _)
    for ( let username of userArray ) {
      if ( !validator.isLength( username, { min: 3, max: 24 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'username length is either too long or too short', 'return': username } );
      if ( !/^(\w+)$/.test( username ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'invalid characters in username', 'return': username } );
    }

    user = await getPublicUserByUsername( userArray );
  } else {
    return res.status( 400 ).send( { 'type': 'fail', 'reason': 'type is not a valid type (objectid|username)', 'return': type } );
  }

  if ( user ) {
    return res.send( { 'type': 'success', user } );
  } else {
    return res.send( { 'type': 'fail', 'reason': 'no such user' } );
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