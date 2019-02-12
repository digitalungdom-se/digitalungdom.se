const getUserById = require( './../models/get' ).getUserById;

module.exports.ensureUserAuthenticated = async function( req, res, next ) {
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
  const id = req.user;
  let user;
  if ( id ) user = await getUserById( db, id );

  if ( !req.isAuthenticated() || !user || !user.verified ) {
    return next();
  } else {
    return res.status( 403 ).send( "forbidden" );
  }
}