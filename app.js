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

const register_check_email = require( './routes/user/register/register_check_email' );
const register_check_username = require( './routes/user/register/register_check_username' );
const register = require( './routes/user/register/register' );

const login = require( './routes/user/login' );

MongoClient.connect( process.env.DB_URL, { useNewUrlParser: true }, async function( err, client ) {
  if ( err ) return console.log( err );
  db = client.db( 'digitalungdom' );

  const app = express();

  app.use( compression() );

  app.enable( 'trust proxy' );

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
  } ) )
  app.use( bodyParser.urlencoded( {
    limit: '100kb',
    extended: false
  } ) );

  app.use( cookieParser() );

  app.use( cors() );
  //app.use( csrf( { cookie: true } ) );

  app.use( session( {
    secret: 'i love javascript',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore( {
      db: db,
    } ),
    //cookie: { secure: true }
  } ) );

  app.use( passport.initialize() );
  app.use( passport.session() );

  app.use( function( req, res, next ) {
    //res.send( { 'csrfToken': req.csrfToken() } )
    return next()
  } );

  app.use( '/api/', register_check_email );
  app.use( '/api/', register_check_username );
  app.use( '/api/', register );
  app.use( '/api/', login );

  app.get( '*', function( req, res ) {
    res.sendFile( path.join( __dirname, '/build/index.html' ) );
  } );

  app.set( 'port', ( 8080 ) );

  app.listen( app.get( 'port' ), () => {
    console.log( 'listening on ', app.get( 'port' ) )
  } )
} )