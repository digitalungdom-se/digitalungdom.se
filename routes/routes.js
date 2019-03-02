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
router.get( '/register_check_username', register.register_check_username );
router.get( '/register_check_email', register.register_check_email );
router.post( '/register', ensureNotUserAuthenticated, register.register );

// authorisation
router.post( '/auth', authorisation.auth );
router.post( '/login', ensureNotUserAuthenticated, authorisation.login );

// Upload profile picture
router.post( '/set_profile_picture', ensureNotUserAuthenticated, authorisation.login );

// agora
router.post( '/agorize', ensureUserAuthenticated, agorize.agorize );
router.post( '/anti_agorize', ensureUserAuthenticated, antiAgorize.antiAgorize );
router.post( '/asteri', ensureUserAuthenticated, asteri.asteri );
router.get( '/get_agoragrams', getAgoragrams.getAgoragrams );
router.get( '/get_agoragram', getAgoragrams.getAgoragram );
router.post( '/meta_agorize', ensureUserAuthenticated, metaAgorize.metaAgorize );

module.exports = router;