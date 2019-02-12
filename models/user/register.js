const bcrypt = require( 'bcryptjs' );
const MongoClient = require( 'mongodb' ).MongoClient;
const express = require( 'express' );
const ObjectID = require( 'mongodb' ).ObjectID;
const crypto = require( 'crypto' );
const path = require( 'path' );
const fs = require( 'fs-extra' )
const Hogan = require( "hogan.js" );

const sendMail = require( './../../helpers/sendMail' ).sendMail;

module.exports.createUser = async function( database, user ) {
  user.password = bcrypt.hashSync( user.password, 12 );
  await database.collection( 'users' ).insertOne( user );
}

module.exports.sendVerification = async function( database, email ) {
  const token = crypto.randomBytes( 32 ).toString( 'hex' );

  let update = {};
  update[ 'verificationToken' ] = token;

  await database.collection( 'users' ).updateOne( { 'email': email }, {
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

module.exports.verify = async function( database, token ) {
  database.collection( 'users' ).updateOne( { 'verificationToken': token }, {
    $unset: { 'verificationToken': 1 },
    $set: { 'verified': true }
  } );
}