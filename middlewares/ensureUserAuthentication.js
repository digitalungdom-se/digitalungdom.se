/* global include */

const validateObjectID = require( 'mongodb' ).ObjectID.isValid;

const getUserById = include( 'models/get' ).getUserById;

module.exports.ensureUserAuthenticated = async function( req, res, next ) {
  /** Ensures that the user is authenticated by checking first if they are authenticated using express and authenticated to the user database.
  Future implementations will have to check what role the user is.
  It may not be needed to query the database to check if the id exists. **/
  const id = req.user;
  let user;
  if ( id && validateObjectID( id ) ) user = await getUserById( id );

  if ( req.isAuthenticated() && user && user.verified ) {
    return next();
  } else {
    return res.status( 401 ).send( { 'type': 'fail', 'reason': 'unauthorized' } );
  }
};

module.exports.ensureNotUserAuthenticated = async function( req, res, next ) {
  /** Ensures that the user is not authenticated by checking if they are authenticated using express **/
  if ( !req.isAuthenticated() ) {
    return next();
  } else {
    return res.status( 403 ).send( { 'type': 'fail', 'reason': 'forbidden' } );
  }
};