const express = require( 'express' );
const router = express.Router();
require( 'express-async-errors' );

const ensureUserAuthenticated = require( './middlewares/ensureUserAuthentication' ).ensureUserAuthenticated;
const ensureNotUserAuthenticated = require( './middlewares/ensureUserAuthentication' ).ensureNotUserAuthenticated;

const register = require( './controllers/user/register' );
const authorisation = require( './controllers/user/authorisation' );

const forgotPassword = require( './controllers/user/forgotPassword' );

const agorize = require( './controllers/user/agora/agorize' );
const antiAgorize = require( './controllers/user/agora/antiAgorize' );
const asteri = require( './controllers/user/agora/asteri' );
const getAgoragrams = require( './controllers/user/agora/getAgoragrams' );
const metaAgorize = require( './controllers/user/agora/metaAgorize' );
const get = require( './controllers/get' );

// registration
router.get( '/register_check_username', register.registerCheckUsername );
router.get( '/register_check_email', register.registerCheckEmail );
router.post( '/register', ensureNotUserAuthenticated, register.register );
router.post( '/verify', ensureNotUserAuthenticated, register.verify );

// forgot password
router.post( '/forgot', ensureNotUserAuthenticated, forgotPassword.forgot );
router.post( '/reset', ensureNotUserAuthenticated, forgotPassword.reset );

// authorisation
router.get( '/auth', authorisation.auth );
router.post( '/login', ensureNotUserAuthenticated, authorisation.login );
router.post( '/logout', ensureUserAuthenticated, authorisation.logout );

// Upload profile picture
router.post( '/set_profile_picture', ensureNotUserAuthenticated, authorisation.login );

// agora
router.post( '/agorize', ensureUserAuthenticated, agorize.agorize );
router.post( '/anti_agorize', ensureUserAuthenticated, antiAgorize.antiAgorize );
router.post( '/asteri', ensureUserAuthenticated, asteri.asteri );
router.get( '/get_agoragrams', getAgoragrams.getAgoragrams );
router.get( '/get_agoragram', getAgoragrams.getAgoragram );
router.post( '/meta_agorize', ensureUserAuthenticated, metaAgorize.metaAgorize );

// get
router.get( '/get_user', get.getPublicUserById );
router.get( '/status', get.status );

// Produce 500 eror
router.get( '/500', async function () {
  throw new Error( 'Random error' );
} );

// Produce 403 eror
router.get( '/403', function ( req, res, next ) {
  let err = new Error( 'Forbidden' );
  err.statusCode = 403;
  err.customMessage = 'Forbidden';
  next( err );
} );

// Produce 401 eror
router.get( '/401', function ( req, res, next ) {
  let err = new Error( 'Unauthorized' );
  err.statusCode = 401;
  err.customMessage = 'Unauthorized';
  next( err );
} );

// Produce 404 error
router.all( '*', function ( req, res, next ) {
  let err = new Error( 'Not Found' );
  err.statusCode = 404;
  err.customMessage = 'Not Found';
  next( err );
} );

module.exports = router;