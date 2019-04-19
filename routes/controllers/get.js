/* global include */

const validateObjectID = require( 'mongodb' ).ObjectID.isValid;
const validator = require( 'validator' );

const getPublicUserById = include( 'models/get' ).getPublicUserById;
const getPublicUserByUsername = include( 'models/get' ).getPublicUserByUsername;
const getMemberAmount = include( 'models/get' ).getMemberAmount;

module.exports.getPublicUser = async function ( req, res ) {
  let userId = req.query.userId;
  let username = req.query.username;

  let user;
  if ( userId ) {
    // Validates userId to ensure that it is an objectId
    if ( !validateObjectID( userId ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'invalid user id', userId } );

    user = await getPublicUserById( userId );
  } else if ( username ) {
    // Validates username according to following rules: min 3 max 24 characters and only includes valid characters (A-Z, a-z, 0-9, and _)
    if ( !validator.isLength( username, { min: 3, max: 24 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Username length is either too long or too short', 'username': username } );
    if ( !/^(\w+)$/.test( username ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Invalid characters in username', 'username': username } );

    user = await getPublicUserByUsername( username );
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