const express = require( 'express' );
const router = express.Router();
const validator = require( 'validator' );

const ensureUserAuthenticated = require( './../../../helpers/ensureUserAuthentication' ).ensureUserAuthenticated;
const ensureNotUserAuthenticated = require( './../../../helpers/ensureUserAuthentication' ).ensureNotUserAuthenticated;

const getUserRolesById = require( './../../../models/get' ).getUserRolesById;
const getRoleIdByName = require( './../../../models/get' ).getRoleIdByName;

const antiAgorize = require( './../../../models/user/agora' ).antiAgorize;
const validateAuthorById = require( './../../../models/user/agora' ).validateAuthorById;

router.post( '/agorize', ensureUserAuthenticated, async function( req, res ) {
  // Fetches all the fields and their values
  const id = req.user;
  const postId = req.body.postId;
  const type = req.body.type;

  if ( !validator.isIn( type, [ 'post', 'comment', 'link', 'question' ] ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'You can only post a (post|comment|link|question)', type } );
  if ( awaitvalidateAuthorById( id, postId, type ) ) {
    await antiAgorize( postId, type );
  } else {
    // Failed
  }

} );

module.exports = router;