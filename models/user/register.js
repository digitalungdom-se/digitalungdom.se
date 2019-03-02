/* global db */

const bcrypt = require( 'bcryptjs' );
const crypto = require( 'crypto' );
const path = require( 'path' );
const fs = require( 'fs-extra' )
const Hogan = require( "hogan.js" );

const sendMail = require( './../../helpers/sendMail' ).sendMail;

module.exports.createUser = async function( user ) {
  // Hahes the users password with 12 salt rounds (standard)
  user.password = bcrypt.hashSync( user.password, 12 );
  await db.collection( 'users' ).insertOne( user );
}

module.exports.sendVerification = async function( email ) {
  // Generates 32 character (byte) long token to use for as a verification token. Inserts it into the users mongodb document and send them an email.
  const token = crypto.randomBytes( 32 ).toString( 'hex' );

  let update = {};
  update[ 'verificationToken' ] = token;

  await db.collection( 'users' ).updateOne( { 'email': email }, {
    $set: update
  } );

  const templateData = fs.readFileSync( path.join( __dirname, '..', 'emails', 'verifyEmail.mustache' ), 'utf8' );
  const template = Hogan.compile( templateData );
  const body = template.render( { token: token } );

  await sendMail( email, 'Digitalungdom - Verifiera din E-postadress', body, [ {
    filename: 'digitalungdom.png',
    path: path.join( __dirname, '..', 'emails', 'images', 'rayslogo.png' ),
    cid: 'logo'
  } ] );
}

module.exports.verify = async function( token ) {
  // Verifies the user by finding the sent token in the db and verifying them.
  db.collection( 'users' ).updateOne( { 'verificationToken': token }, {
    $unset: { 'verificationToken': 1 },
    $set: { 'verified': true }
  } );
}