/* global include */

const validateObjectID = require( 'mongodb' ).ObjectID.isValid;

const getPublicUserById = include( 'models/get' ).getPublicUserById;

module.exports.getPublicUserById = async function ( req, res ) {
  let userId = req.query.userId;

  if ( userId && !validateObjectID( userId ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'invalid user id', userId } );

  const user = await getPublicUserById( userId );
  if ( user ) {
    return res.send( { 'type': 'success', user } );
  } else {
    return res.send( { 'type': 'fail', 'reason': 'no such user' } );
  }
};

module.exports.status = async function ( req, res ) {
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
    }
  }
  return res.send( json )
};