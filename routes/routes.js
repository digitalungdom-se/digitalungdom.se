const express = require( 'express' );
const router = express.Router();

const ensureUserAuthenticated = require( './../helpers/ensureUserAuthentication' ).ensureUserAuthenticated;
const ensureNotUserAuthenticated = require( './../helpers/ensureUserAuthentication' ).ensureNotUserAuthenticated;

const register = require( './user/register' );
const authorisation = require( './user/authorisation' );

const agorize = require( './user/agora/agorize' );
const antiAgorize = require( './user/agora/antiAgorize' );
const asteri = require( './user/agora/asteri' );
const getAgoragrams = require( './user/agora/getAgoragrams' );
const metaAgorize = require( './user/agora/metaAgorize' );

// registration
router.post( '/register_check_username', register.register_check_username );
router.post( '/register_check_email', register.register_check_email );
router.post( '/register', ensureNotUserAuthenticated, register.register );

// authorisation
router.post( '/auth', authorisation.auth );
router.post( '/login', ensureNotUserAuthenticated, authorisation.login );

// agora
router.post( '/agorize', agorize.agorize );
router.post( '/antiagorize', antiAgorize.antiAgorize );
router.post( '/asteri', asteri.asteri );
router.post( '/getagoragrams', getAgoragrams.getAgoragrams );
router.post( '/metaagorize', metaAgorize.metaAgorize );

module.exports = router;