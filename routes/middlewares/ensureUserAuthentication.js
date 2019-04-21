/* global include */

const validateObjectID = require( 'mongodb' ).ObjectID.isValid;

const getUserById = include( 'models/get' ).getUserById;

module.exports.ensureUserAuthenticated = async function ( req, res, next ) {
  /** Ensures that the user is authenticated by checking first if they are authenticated using express and authenticated to the user database.
  Future implementations will have to check what role the user is.
  It may not be needed to query the database to check if the id exists. **/
  const id = req.user;
  let user;
  if ( id && validateObjectID( id ) ) user = await getUserById( id );

  if ( req.isAuthenticated() && user && user.details.verified ) {
    return next();
  } else {
    let err = new Error( 'unauthorised' );
    err.statusCode = 401;
    err.customMessage = 'unauthorised';
    next( err );
  }
};

module.exports.ensureNotUserAuthenticated = async function ( req, res, next ) {
  /** Ensures that the user is not authenticated by checking if they are authenticated using express **/
  if ( !req.isAuthenticated() ) {
    return next();
  } else {
    let err = new Error( 'forbidden' );
    err.statusCode = 403;
    err.customMessage = 'forbidden';
    next( err );
  }
};