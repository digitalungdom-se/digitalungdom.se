/* global db include abs_path*/

const bcrypt = require( 'bcryptjs' );
const crypto = require( 'crypto' );
const fs = require( 'fs-extra' );
const util = require( 'util' );
const readFile = util.promisify( fs.readFile );
const Hogan = require( 'hogan.js' );

const sendMail = include( 'utils/sendMail' ).sendMail;

module.exports.createUser = async function( user ) {
  // Hahes the users password with 12 salt rounds (standard)
  user.password = bcrypt.hashSync( user.password, 13 );

  // Generates 32 character (byte) long token to use for as a verification token. Inserts it into the users mongodb document and send them an email.
  const token = crypto.randomBytes( 32 ).toString( 'hex' );
  user.verificationToken = token;

  const templateData = await readFile( abs_path( 'emails/register/verifyEmail.mustache' ), 'utf8' );
  const template = Hogan.compile( templateData );
  const body = template.render( { token: token } );

  await Promise.all( [
    sendMail( user.email, 'Verifiera din e-postadress', body ),
    db.collection( 'users' ).insertOne( user ),
  ] );
};

module.exports.sendVerification = async function( email ) {
  // Finds token if exists
  let token = db.collection( 'users' ).findOne( { 'email': email }, { 'projection': { '_id': 0, 'verificationToken': 1 } } );

  // Generates 32 character (byte) long token to use for as a verification token. Inserts it into the users mongodb document and send them an email.
  if ( !token ) {
    token = crypto.randomBytes( 32 ).toString( 'hex' );
    let update = {};
    update[ 'verificationToken' ] = token;

    await db.collection( 'users' ).updateOne( { 'email': email }, {
      '$set': update
    } );

  }

  const templateData = await readFile( abs_path( 'emails/register/verifyEmail.mustache' ), 'utf8' );
  const template = Hogan.compile( templateData );
  const body = template.render( { token: token } );

  await sendMail( email, 'Verifiera din e-postadress', body );
};

module.exports.verify = async function( token ) {
  // Verifies the user by finding the sent token in the db and verifying them.
  await db.collection( 'users' ).findOneAndUpdate( { 'verificationToken': token }, {
    '$unset': { 'verificationToken': 1 },
    '$set': { 'verified': true }
  }, {
    '_id': 1
  } );
};