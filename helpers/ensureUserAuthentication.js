const getUserById = require( './../models/users' ).getUserById;

module.exports.ensureUserAuthenticated = async function( req, res, next ) {
  const id = req.user;
  if ( id ) user = await getUserById( db, id );

  if ( req.isAuthenticated() && user && user.verified ) {
    return next();
  } else {
    req.flash( 'error', 'Du är inte inloggad' );
    return res.redirect( '/login' );
  }
}

module.exports.ensureNotUserAuthenticated = async function( req, res, next ) {
  const id = req.user;
  if ( id ) user = await getUserById( db, id );

  if ( !req.isAuthenticated() || !user || !user.verified ) {
    return next();
  } else {
    return res.redirect( '/' );
  }
}