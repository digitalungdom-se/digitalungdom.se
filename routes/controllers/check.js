/* global include */
const validator = require( 'validator' );

const checkUsername = include( 'models/check' ).checkUsername;
const checkEmail = include( 'models/check' ).checkEmail;

module.exports.registerCheckUsername = async function ( req, res ) {
  const username = req.query.username;

  if ( typeof username != 'string' ) return res.send( { username: false } );
  // Validates username according to following rules: min 3 max 24 characters and only includes valid characters (A-Z, a-z, 0-9, and _)
  if ( !validator.isLength( username, { min: 3, max: 24 } ) ) return res.send( false );
  if ( !/^(\w+)$/.test( username ) ) return res.send( false );

  return res.send( { 'username': ( await checkUsername( username ) ).valid } );
};

module.exports.registerCheckEmail = async function ( req, res ) {
  const email = req.query.email;

  // Validates email according to following rules: is a valid email.
  if ( typeof email != 'string' ) return res.send( false );
  if ( !validator.isEmail( email ) ) return res.send( false );

  return res.send( { 'email': ( await checkEmail( email ) ).valid } );
};