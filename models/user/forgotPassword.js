/* global db include */

const bcrypt = require( 'bcryptjs' );
const crypto = require( 'crypto' );
const sha256 = require( 'js-sha256' );
const path = require( 'path' );
const fs = require( 'fs-extra' );
const Hogan = require( 'hogan.js' );

const sendMail = include( 'helpers/sendMail' ).sendMail;

module.exports.forgotPassword = async function( email ) {
  const token = crypto.randomBytes( 36 ).toString( 'hex' );
  const tokenHash = sha256( token );

  const tokenExpires = new Date( ( new Date ).getTime() + 600000 );

  let update = {};
  update[ 'resetPasswordToken' ] = tokenHash;
  update[ 'resetPasswordExpires' ] = tokenExpires;

  await db.collection( 'applications' ).updateOne( {
    'email': email
  }, {
    $set: update
  } );

  const templateData = fs.readFileSync( path.join( __dirname, '..', 'emails', 'forgotPassword.mustache' ), 'utf8' )
  const template = Hogan.compile( templateData );
  const body = template.render( { token: token } );

  await sendMail( email, 'Glömt lösenord', body );
};

module.exports.resetPassword = async function( token, password ) {
  password = bcrypt.hashSync( password, 13 );
  token = sha256( token );

  const user = await db.collection( 'users' ).findOne( { 'resetPasswordToken': token }, {
    projection: { '_id': 0, 'email': 1 }
  } );

  await db.collection( 'users' ).updateOne( { 'resetPasswordToken': token }, {
    '$set': { 'password': password },
    '$unset': { 'resetPasswordToken': 1, 'resetPasswordExpires': 1 }
  } );

  const templateData = fs.readFileSync( path.join( __dirname, '..', 'emails', 'forgotConfirmation.mustache' ), 'utf8' )
  const template = Hogan.compile( templateData );
  const body = template.render();

  await sendMail( user.email, 'Ditt lösenord har ändrats', body );
};