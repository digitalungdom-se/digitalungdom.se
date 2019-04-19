/* global include */

const validator = require( 'validator' );

const sendForgotPassword = include( 'models/user/forgotPassword' ).sendForgotPassword;
const resetPassword = include( 'models/user/forgotPassword' ).resetPassword;

module.exports.forgot = async function ( req, res ) {
  let email = req.body.email;
  if ( typeof email != 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Only strings are accepted' } );
  // Validates email according to following rules: is a valid email.
  if ( !validator.isEmail( email ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Malformed email address', email } );
  // Normalises email according to validatorjs (see validatorjs documentation for rules)
  email = validator.normalizeEmail( email );

  const result = await sendForgotPassword( email );

  if ( result.error ) {
    return res.send( {
      'type': 'fail',
      'reason': result.error,
      email
    } );
  } else {
    return res.send( {
      'type': 'success'
    } );
  }
};

module.exports.reset = async function ( req, res ) {
  const password = req.body.password;
  const token = req.body.token;

  if ( typeof password != 'string' || typeof token != 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Only strings are accepted' } );

  // Validates password according to following rules: min 8 max 72 characters, includes at least one character and one number
  if ( !validator.isLength( password, { min: 8, max: 72 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Password length is either too long or too short', 'password': password } );
  if ( !/((.*[a-öA-Ö])(.*[0-9]))|((.*[0-9])(.*[a-öA-Ö]))/.test( password ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Password is not strong enough', 'password': password } );

  const result = await resetPassword( token, password );

  if ( result.error ) {
    return res.send( {
      'type': 'fail',
      'reason': result.error,
      token
    } );
  } else {
    return res.send( {
      'type': 'success'
    } );
  }
};