/* global db include abs_path */

const ObjectID = require( 'mongodb' ).ObjectID;
const crypto = require( 'crypto' );
const fs = require( 'fs-extra' );
const util = require( 'util' );
const readFile = util.promisify( fs.readFile );
const Hogan = require( 'hogan.js' );

const sendMail = include( 'utils/sendMail' ).sendMail;

module.exports.userSet = async function ( id, update ) {
  return ( await db.collection( 'users' ).updateOne( { '_id': ObjectID( id ) }, update ) );
};

module.exports.setNewEmail = async function ( userId, email ) {
  userId = ObjectID( userId );
  // Generates 32 character (byte) long token to use for as a verification token. Inserts it into the users mongodb document and send them an email.
  const verificationToken = crypto.randomBytes( 32 ).toString( 'hex' );

  const templateData = await readFile( abs_path( 'emails/register/verifyEmail.mustache' ), 'utf8' );
  const template = Hogan.compile( templateData );
  const body = template.render( { token: verificationToken } );

  await Promise.all( [
    sendMail( email, 'Verifiera din e-postadress', body ),
    db.collection( 'users' ).updateOne( { '_id': userId }, { $set: { 'verificationToken': verificationToken, 'newEmail': email } } ),
  ] );

  return { 'error': false };
};