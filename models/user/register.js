/* global db include abs_path*/

const bcrypt = require( 'bcryptjs' );
const crypto = require( 'crypto' );
const fs = require( 'fs-extra' );
const util = require( 'util' );
const readFile = util.promisify( fs.readFile );
const Hogan = require( 'hogan.js' );
const ObjectID = require( 'mongodb' ).ObjectID;

const sendMail = include( 'utils/sendMail' ).sendMail;

module.exports.createUser = async function ( user ) {
  // Hahes the users password with 12 salt rounds (standard)
  user.details.password = await bcrypt.hash( user.details.password, 13 );

  // Generates 32 character (byte) long token to use for as a verification token. Inserts it into the users mongodb document and send them an email.
  const verificationToken = crypto.randomBytes( 32 ).toString( 'hex' );
  user.verificationToken = verificationToken;

  const templateData = await readFile( abs_path( 'emails/register/verifyEmail.mustache' ), 'utf8' );
  const template = Hogan.compile( templateData );
  const body = template.render( { token: verificationToken } );

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
  let result = db.collection( 'users' ).findOne( { '$or': [ { 'details.email': email }, { 'newEmail': email } ] }, {
    'projection': {
      '_id': 0,
      'verificationToken': 1,
      'details.verified': 1,
      'newEmail': 1,
    }
  } );

  if ( !result ) return { 'error': 'no such email', 'fields': [ 'email' ], 'return': { email } };
  // Generates 32 character (byte) long token to use for as a verification token. Inserts it into the users mongodb document and send them an email.
  let verificationToken = crypto.randomBytes( 32 ).toString( 'hex' );
  if ( result.details.verified ) {
    if ( !result.verificationToken ) queryArray.push( db.collection( 'users' ).updateOne( { 'newEmail': email }, { $set: { 'verificationToken': verificationToken } } ) );
    else verificationToken = result.verificationToken;
  } else if ( !result.verificationToken ) {
    queryArray.push( db.collection( 'users' ).updateOne( { 'details.email': email }, { $set: { 'verificationToken': verificationToken } } ) );
  } else {
    verificationToken = result.verificationToken;
  }


  const templateData = await readFile( abs_path( 'emails/register/verifyEmail.mustache' ), 'utf8' );
  const template = Hogan.compile( templateData );
  const body = template.render( { token: verificationToken } );

  queryArray.push( sendMail( email, 'Verifiera din e-postadress', body ) );

  await Promise.all( queryArray );

  return { 'error': false };
};

module.exports.verify = async function ( verificationToken ) {
  // Verifies the user by finding the sent token in the db and verifying them.
  const exists = ( await db.collection( 'users' ).findOneAndUpdate( { 'verificationToken': verificationToken }, {
    $unset: { 'verificationToken': 1 },
    $set: { 'details.verified': true }
  }, {
    '_id': 1,
    'newEmail': 1
  } ) ).value;

  if ( !exists ) return { 'error': 'verificationToken does not exist', 'fields': [ 'token' ], 'return': { 'token': verificationToken } };
  if ( exists[ 'newEmail' ] ) {
    const userId = ObjectID( exists[ '_id' ] );
    const email = exists[ 'newEmail' ];

    db.collection( 'users' ).updateOne( { '_id': userId }, {
      $unset: { 'newEmail': 1 },
      $set: { 'details.email': email }
    } );
  }

  return { 'error': false };
};