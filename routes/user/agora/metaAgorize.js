const express = require( 'express' );
const router = express.Router();
const validator = require( 'validator' );

const ensureUserAuthenticated = require( './../../../helpers/ensureUserAuthentication' ).ensureUserAuthenticated;
const ensureNotUserAuthenticated = require( './../../../helpers/ensureUserAuthentication' ).ensureNotUserAuthenticated;

const getUserByEmail = require( './../../../models/get' ).getUserByEmail;
const getUserByUsername = require( './../../../models/get' ).getUserByUsername;
const getUserById = require( './../../../models/get' ).getUserById;
const getUserRolesById = require( './../../../models/get' ).getUserRolesById;
const getRoleIdByName = require( './../../../models/get' ).getRoleIdByName;

const metaAgorize = require( './../../../models/user/agora' ).metaAgorize;

router.post( '/agorize', ensureUserAuthenticated, async function( req, res ) {
  // Fetches all the fields and their values
  const id = req.user;
  const body = req.body.body;

  // Checks that they all are strings, validatorjs only allows string (prevent errors)
  if ( typeof body !== 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Only strings are accepted' } );
  if ( !validator.isIn( type, [ 'post', 'comment', 'question' ] ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'You can only post a (post|comment|link|question)', type } );
  if ( !validator.isLength( body, { min: 0, max: 10000 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Body is too long', body } );

  if ( await validateAuthorById( id, postId ) ) {
    await metaAgorize( id, postId );
  } else {
    // Failed
  }

} );

module.exports = router;