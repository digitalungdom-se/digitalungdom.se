/* global include */

const validator = require( 'validator' );

const sendForgotPassword = include( 'models/user/forgotPassword' ).sendForgotPassword;
const resetPassword = include( 'models/user/forgotPassword' ).resetPassword;

module.exports.forgot = async function( req, res ) {
  const email = validator.normalizeEmail( req.body.email );

  const exists = await sendForgotPassword( email );
  console.log( exists );
  if ( exists ) {
    return res.send( {
      'type': 'success'
    } );
  } else {
    return res.send( {
      'type': 'failed',
      'reason': 'email does not exist'
    } );
  }
};

module.exports.reset = async function( req, res ) {
  const password = req.body.password;
  const token = req.body.token;

  if ( !validator.isLength( password, { min: 8, max: 72 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Password length is either too long or too short', 'password': password } );
  if ( !/((.*[a-öA-Ö])(.*[0-9]))|((.*[0-9])(.*[a-öA-Ö]))/.test( password ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Password is not strong enough', 'password': password } );

  const exists = await resetPassword( token, password );

  if ( exists ) {
    return res.send( {
      'type': 'success'
    } );
  } else {
    return res.send( {
      'type': 'failed',
      'reason': 'reset token does not exist'
    } );
  }
};