const express = require( 'express' );
const router = express.Router();
require( 'express-async-errors' );

const ensureUserAuthenticated = require( './middlewares/ensureUserAuthentication' ).ensureUserAuthenticated;
const ensureNotUserAuthenticated = require( './middlewares/ensureUserAuthentication' ).ensureNotUserAuthenticated;

const register = require( './controllers/user/register' );
const authorisation = require( './controllers/user/authorisation' );
const forgotPassword = require( './controllers/user/forgotPassword' );
const agora = require( './controllers/user/agora' );
const set = require( './controllers/user/set' );

const check = require( './controllers/check' );
const get = require( './controllers/get' );

// registration
router.get( '/register_check_username', check.registerCheckUsername );
router.get( '/register_check_email', check.registerCheckEmail );
router.post( '/register', register.register );
router.post( '/verify', register.verify );

// forgot password
router.post( '/forgot_password', forgotPassword.forgot );
router.post( '/reset_password', forgotPassword.reset );

// authorisation
router.get( '/auth', authorisation.auth );
router.post( '/login', authorisation.login );
router.post( '/logout', authorisation.logout );

// set settings
router.post( '/set', ensureUserAuthenticated, set.set );

// agora
router.post( '/agorize', ensureUserAuthenticated, agora.agorize );
router.post( '/anti_agorize', ensureUserAuthenticated, agora.antiAgorize );
router.post( '/meta_agorize', ensureUserAuthenticated, agora.metaAgorize );
router.post( '/asteri', ensureUserAuthenticated, agora.asteri );
router.get( '/get_agoragrams', agora.getAgoragrams );
router.get( '/get_agoragram', agora.getAgoragram );

router.post( '/report', agora.report );

// get
router.get( '/get_user', get.getPublicUser );
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