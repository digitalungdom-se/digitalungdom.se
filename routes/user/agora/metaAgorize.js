const validator = require( 'validator' );
const validateObjectID = require( 'mongodb' ).ObjectID.isValid;

const ensureUserAuthenticated = require( './../../../helpers/ensureUserAuthentication' ).ensureUserAuthenticated;
const ensureNotUserAuthenticated = require( './../../../helpers/ensureUserAuthentication' ).ensureNotUserAuthenticated;

const getUserByEmail = require( './../../../models/get' ).getUserByEmail;
const getUserByUsername = require( './../../../models/get' ).getUserByUsername;
const getUserById = require( './../../../models/get' ).getUserById;
const getUserRolesById = require( './../../../models/get' ).getUserRolesById;
const getRoleIdByName = require( './../../../models/get' ).getRoleIdByName;

const metaAgorize = require( './../../../models/user/agora' ).metaAgorize;

module.exports.metaAgorize = async function( req, res ) {
  // Fetches all the fields and their values
  const id = req.user;
  const postId = req.body.postId;
  const body = req.body.body;

  // Checks that they all are strings, validatorjs only allows string (prevent errors)
  if ( typeof body !== 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Only strings are accepted' } );
  if ( !validateObjectID( postId ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'postId is not an objectID', postId } );
  if ( !validator.isLength( body, { min: 0, max: 10000 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Body is too long', body } );

  if ( await validateAuthorById( id, postId ) ) {
    const exists = await metaAgorize( postId, { body } );
    console.log( exists );
    if ( new Date() - exists < 10000 ) return res.status( 201 ).send( { 'type': 'success' } );
    else if ( exists ) return res.status( 500 ).send( { 'type': 'failed', 'reason': 'internal server error' } );
    else return res.status( 404 ).send( { 'type': 'failed', 'reason': 'no post with that id', postId } );
  } else {
    return res.status( 403 ).send( { 'type': 'fail', 'reason': 'not authorised to edit this post', postId } );
  }
}