const getUserById = require( './../models/get' ).getUserById;


module.exports.ensureUserAuthenticated = async function( req, res, next ) {
  /** Ensures that the user is authenticated by checking first if they are authenticated using express and authenticated to the user database.
  Future implementations will have to check what role the user is. **/
  const id = req.user;
  let user;
  if ( id ) user = await getUserById( db, id );

  if ( req.isAuthenticated() && user && user.verified ) {
    return next();
  } else {
    return res.status( 401 ).send( "unauthorized" );
  }
}

module.exports.ensureNotUserAuthenticated = async function( req, res, next ) {
  /** Ensures that the user is not authenticated by checking if they are authenticated using express **/
  const id = req.user;

  if ( !req.isAuthenticated() ) {
    return next();
  } else {
    return res.status( 403 ).send( "forbidden" );
  }
}