/* global db include abs_path*/

const bcrypt = require( 'bcryptjs' );
const crypto = require( 'crypto' );
const multihashing = require( 'multihashing-async' );
const fs = require( 'fs-extra' );
const util = require( 'util' );
const readFile = util.promisify( fs.readFile );
const Hogan = require( 'hogan.js' );

const sendMail = include( 'utils/sendMail' ).sendMail;

module.exports.sendForgotPassword = async function ( email ) {
  const token = crypto.randomBytes( 36 ).toString( 'hex' );
  const tokenHash = await multihashing.digest( token, 'sha2-512' );

  const tokenExpires = new Date( ( new Date ).getTime() + 600000 );

  let update = {};
  update[ 'resetPassword.token' ] = tokenHash;
  update[ 'resetPassword.expires' ] = tokenExpires;

  const result = ( await db.collection( 'users' ).findOneAndUpdate( { 'details.email': email }, { '$set': update }, { '_id': 1 } ) ).value;
  if ( !result ) return { 'error': 'no such email' };

  const templateData = await readFile( abs_path( 'emails/forgotPassword/forgotPassword.mustache' ), 'utf8' );
  const template = Hogan.compile( templateData );
  const body = template.render( { token: token } );

  sendMail( email, 'Glömt lösenord', body );

  return { 'error': false };
};

module.exports.resetPassword = async function ( token, password ) {
  password = bcrypt.hashSync( password, 13 );
  token = await multihashing.digest( token, 'sha2-512' );

  const exists = await db.collection( 'users' ).findOneAndUpdate( {
    'resetPassword.token': token,
    'resetPassword.expires': { $gte: new Date() }
  }, {
    '$set': { 'details.password': password },
    '$unset': { 'resetPassword.token': 1, 'resetPassword.expires': 1 }
  }, { 'projection': { '_id': 0, 'details.email': 1 } } );

  if ( !exists.value ) return { 'error': 'no such valid reset password token' };
  const email = exists.value.details.email;

  const templateData = await readFile( abs_path( 'emails/forgotPassword/forgotPasswordConfirmation.mustache' ), 'utf8' );
  const template = Hogan.compile( templateData );
  const body = template.render();

  sendMail( email, 'Ditt lösenord har ändrats', body );
  return { 'error': false };
};