/* global include */

const validator = require( 'validator' );

const sendForgotPassword = include( 'models/user/forgotPassword' ).sendForgotPassword;
const resetPassword = include( 'models/user/forgotPassword' ).resetPassword;

module.exports.forgot = async function ( req, res ) {
  // error array, should be used in every controller to handle errors and return them to client
  const errors = [];
  let email = req.body.email;
  if ( typeof email != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'fields': [ 'email' ], 'return': { email } } );
  // Validates email according to following rules: is a valid email.
  if ( !validator.isEmail( email ) ) errors.push( { 'reason': 'malformed email address', 'fields': [ 'email' ], 'return': { email } } );
  // Normalises email according to validatorjs (see validatorjs documentation for rules)
  email = validator.normalizeEmail( email );

  const status = await sendForgotPassword( email );
  if ( status.error ) errors.push( { 'reason': status.error, 'fields': status.fields, 'return': status.return } );

  if ( errors.length > 0 ) return res.status( 400 ).send( { 'type': 'fail', 'errors': errors } );
  else return res.send( { 'type': 'success' } );
};

module.exports.reset = async function ( req, res ) {
  // error array, should be used in every controller to handle errors and return them to client
  const errors = [];
  const password = req.body.password;
  const token = req.body.token;

  if ( typeof password != 'string' || typeof token != 'string' ) errors.push( { 'reason': 'only strings are accepted', 'fields': [ 'password', 'token' ], 'return': { token } } );

  // Validates password according to following rules: min 8 max 72 characters, includes at least one character and one number
  if ( !validator.isLength( password, { min: 8, max: 72 } ) ) errors.push( { 'reason': 'password is not in length range 8-72', 'fields': [ 'password' ], 'return': {} } );
  if ( !/((.*[a-öA-Ö])(.*[0-9]))|((.*[0-9])(.*[a-öA-Ö]))/.test( password ) ) errors.push( { 'reason': 'password is not strong enough', 'fields': [ 'password' ], 'return': {} } );

  if ( errors.length > 0 ) return res.status( 400 ).send( { 'type': 'fail', 'errors': errors } );

  const status = await resetPassword( token, password );
  if ( status.error ) errors.push( { 'reason': status.error, 'fields': status.fields, 'return': status.return } );

  if ( errors.length > 0 ) return res.status( 400 ).send( { 'type': 'fail', 'errors': errors } );
  else return res.send( { 'type': 'success' } );
};