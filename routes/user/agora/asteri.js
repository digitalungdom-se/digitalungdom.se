const express = require( 'express' );
const router = express.Router();
const validator = require( 'validator' );

const ensureUserAuthenticated = require( './../../../helpers/ensureUserAuthentication' ).ensureUserAuthenticated;
const ensureNotUserAuthenticated = require( './../../../helpers/ensureUserAuthentication' ).ensureNotUserAuthenticated;

const getUserRolesById = require( './../../../models/get' ).getUserRolesById;
const getRoleIdByName = require( './../../../models/get' ).getRoleIdByName;

const asteri = require( './../../../models/user/agora' ).asteri;

router.post( '/agorize', ensureUserAuthenticated, async function( req, res ) {
  // Fetches all the fields and their values
  const id = req.user;
  const postId = req.body.postId;

  await asteri( id, postId );
} );

module.exports = router;