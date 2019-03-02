"use strict";
require( 'dotenv' ).config();

const express = require( 'express' );
const path = require( 'path' );
const bodyParser = require( 'body-parser' );
const cookieParser = require( 'cookie-parser' );
const session = require( 'express-session' );
const MongoStore = require( 'connect-mongo' )( session );
const passport = require( 'passport' );
const LocalStrategy = require( 'passport-local' ).Strategy;
const MongoClient = require( 'mongodb' ).MongoClient;
const helmet = require( 'helmet' );
const compression = require( 'compression' );
const csrf = require( 'csurf' );
const cors = require( 'cors' );
const fileUpload = require( 'express-fileupload' );

const routes = require( './routes/routes' );

// Gets current development state of the node environment (PRODUCTION/DEVELOPMENT). Is set in .env file
const state = process.env.NODE_ENV;

const app = express();

MongoClient.connect( process.env.DB_URL, { useNewUrlParser: true }, async function( err, client ) {
  if ( err ) return console.log( err );
  global.db = client.db( 'digitalungdom' );

  app.use( compression() );

  if ( state === 'PRODUCTION' ) app.enable( 'trust proxy' );

  app.use( helmet() );
  app.use( helmet.permittedCrossDomainPolicies() );
  app.use( helmet.referrerPolicy( { policy: 'same-origin' } ) );
  app.use( helmet.hsts( {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  } ) );

  app.use( express.static( 'build' ) );

  app.use( bodyParser.json( {
    limit: '100kb'
  } ) );

  app.use( bodyParser.urlencoded( {
    limit: '100kb',
    extended: false
  } ) );

  app.use( cookieParser() );

  app.use( cors() );
  //app.use( csrf( { cookie: true } ) );

  // Please change secret in production (should be a random string, just slam ones head on the keyboard)
  app.use( session( {
    secret: 'i love javascript',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore( {
      db: db,
    } ),
    cookie: { secure: ( state === 'PRODUCTION' ) }
  } ) );

  app.use( passport.initialize() );
  app.use( passport.session() );

  app.use( fileUpload( { limits: { fileSize: 1 * 1024 * 1024 } } ) );

  app.use( function( req, res, next ) {
    //res.send( { 'csrfToken': req.csrfToken() } )
    return next()
  } );

  app.use( function( err, req, res, next ) {
    res.status( 500 ).send( "Oj uhmmm, något gick fel?" );
    console.error( error );
  } );

  app.use( '/api/', routes );

  app.get( '*', function( req, res ) {
    res.sendFile( path.join( __dirname, '/build/index.html' ) );
  } );

  app.set( 'port', ( 8080 ) );

  app.listen( app.get( 'port' ), () => {
    console.log( state, ': listening on ', app.get( 'port' ) );
  } )
} )