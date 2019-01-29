require( 'dotenv' ).config();

const express = require( 'express' );
const validator = require( 'validator' );
const path = require( 'path' );
const bodyParser = require( 'body-parser' );
const cookieParser = require( 'cookie-parser' );
const session = require( 'express-session' );
const MongoStore = require( 'connect-mongo' )( session );
const passport = require( 'passport' );
const LocalStrategy = require( 'passport-local' ).Strategy;
const MongoClient = require( 'mongodb' ).MongoClient;
const helmet = require( 'helmet' );
const rateLimit = require( 'express-rate-limit' );

MongoClient.connect( process.env.DB_URL, { useNewUrlParser: true }, function( err, client ) {
  if ( err ) return console.log( err );
  const db = client.db( 'digitalungdom' );

  const app = express();

  app.use( helmet() );

  const limiter = rateLimit( {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 100 requests per windowMs
    handler: function( req, res ) {
      res.status( 429 ).render( 'error.ejs', {
        errorcode: '429',
        message: 'Du har skickat för mångar request, försök igen senare >:('
      } );
    }
  } );

  app.use( limiter );

  app.use( express.static( 'build' ) );

  app.use( bodyParser.json( {
    limit: '100kb'
  } ) )
  app.use( bodyParser.urlencoded( {
    limit: '100kb',
    extended: false
  } ) );

  app.use( cookieParser() );

  app.set( 'trust proxy', 1 )

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

  // const routeVariable = require( './routes/route' );
  // app.use( '/', routeVariable );

  app.get( '*', function( req, res ) {
    res.sendFile( path.join( __dirname, '/build/index.html' ) );
  } )

  app.set( 'port', ( 3000 ) );

  app.listen( app.get( 'port' ), () => {
    console.log( 'listening on ', app.get( 'port' ) )
  } )
} )