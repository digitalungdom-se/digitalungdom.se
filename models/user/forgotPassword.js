/* global db include abs_path*/

const bcrypt = require( 'bcryptjs' );
const crypto = require( 'crypto' );
const sha256 = require( 'js-sha256' );
const fs = require( 'fs-extra' );
const util = require( 'util' );
const readFile = util.promisify( fs.readFile );
const Hogan = require( 'hogan.js' );

const sendMail = include( 'utils/sendMail' ).sendMail;

module.exports.sendForgotPassword = async function( email ) {
  const token = crypto.randomBytes( 36 ).toString( 'hex' );
  const tokenHash = sha256( token );

  const tokenExpires = new Date( ( new Date ).getTime() + 600000 );

  let update = {};
  update[ 'resetPasswordToken' ] = tokenHash;
  update[ 'resetPasswordExpires' ] = tokenExpires;

  const templateData = readFile( abs_path( 'emails/forgotPassword/forgotPassword.mustache' ), 'utf8' );
  const template = Hogan.compile( templateData );
  const body = template.render( { token: token } );

  await Promise.all( [
    sendMail( email, 'Glömt lösenord', body ),
    db.collection( 'applications' ).findOneAndUpdate( { 'email': email }, { '$set': update }, { '_id': 1 } )
  ] );
};

module.exports.resetPassword = async function( token, password ) {
  password = bcrypt.hashSync( password, 13 );
  token = sha256( token );

  const email = ( await db.collection( 'users' ).findOneAndUpdate( { 'resetPasswordToken': token }, {
    '$set': { 'password': password },
    '$unset': { 'resetPasswordToken': 1, 'resetPasswordExpires': 1 }
  }, { 'projection': { '_id': 0, 'email': 1 } } ) ).email;

  const templateData = readFile( abs_path( 'emails/forgotPassword/forgotPasswordConfirmation.mustache' ), 'utf8' );
  const template = Hogan.compile( templateData );
  const body = template.render();

  await sendMail( email, 'Ditt lösenord har ändrats', body );
};