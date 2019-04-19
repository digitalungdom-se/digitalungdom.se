/* global db include abs_path*/

const bcrypt = require( 'bcryptjs' );
const crypto = require( 'crypto' );
const fs = require( 'fs-extra' );
const util = require( 'util' );
const readFile = util.promisify( fs.readFile );
const Hogan = require( 'hogan.js' );

const sendMail = include( 'utils/sendMail' ).sendMail;

module.exports.createUser = async function ( user ) {
  // Hahes the users password with 12 salt rounds (standard)
  user.details.password = bcrypt.hashSync( user.details.password, 13 );

  // Generates 32 character (byte) long token to use for as a verification token. Inserts it into the users mongodb document and send them an email.
  const token = crypto.randomBytes( 32 ).toString( 'hex' );
  user.verificationToken = token;

  const templateData = await readFile( abs_path( 'emails/register/verifyEmail.mustache' ), 'utf8' );
  const template = Hogan.compile( templateData );
  const body = template.render( { token: token } );

  await Promise.all( [
    sendMail( user.details.email, 'Verifiera din e-postadress', body ),
    db.collection( 'users' ).insertOne( user ),
  ] );

  return { 'error': false };
};

module.exports.sendVerification = async function ( email ) {
  // Initiate query array, array that withholds queries that will be called async later.
  let queryArray = [];

  // Finds token if exists
  let result = db.collection( 'users' ).findOne( { 'details.email': email }, { 'projection': { '_id': 0, 'verificationToken': 1, 'details.verified': 1 } } );
  if ( !result ) return { 'error': 'no such email' };
  else if ( result.details && result.details.verified ) return { 'error': 'already verified' };

  // Generates 32 character (byte) long token to use for as a verification token. Inserts it into the users mongodb document and send them an email.
  let token;
  if ( !result.verificationToken ) {
    token = crypto.randomBytes( 32 ).toString( 'hex' );
    queryArray.push( db.collection( 'users' ).updateOne( { 'details.email': email }, { '$set': { 'verificationToken': token } } ) );
  } else {
    token = result.verificationToken;
  }

  const templateData = await readFile( abs_path( 'emails/register/verifyEmail.mustache' ), 'utf8' );
  const template = Hogan.compile( templateData );
  const body = template.render( { token: token } );

  queryArray.push( sendMail( email, 'Verifiera din e-postadress', body ) );

  await Promise.all( queryArray );

  return { 'error': false };
};

module.exports.verify = async function ( token ) {
  // Verifies the user by finding the sent token in the db and verifying them.
  const exists = ( await db.collection( 'users' ).findOneAndUpdate( { 'verificationToken': token }, {
    '$unset': { 'verificationToken': 1 },
    '$set': { 'details.verified': true }
  }, {
    '_id': 1
  } ) ).value;

  if ( !exists ) return { 'error': 'verification token does not exist' };

  return { 'error': false };
};