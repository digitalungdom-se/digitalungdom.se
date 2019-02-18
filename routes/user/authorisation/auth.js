const express = require( 'express' );
const router = express.Router();

const ensureUserAuthenticated = require( './../../../helpers/ensureUserAuthentication' ).ensureUserAuthenticated;
const ensureNotUserAuthenticated = require( './../../../helpers/ensureUserAuthentication' ).ensureNotUserAuthenticated;

const getUserById = require( './../../../models/get' ).getUserById;

router.post( '/auth', async function( req, res ) {
  const id = req.user;
  if ( !id ) return res.status( 401 ).send( { "type": "failed", "reason": "Not authorised" } );
  const user = await getUserById( db, id );

  return res.send( {
    "type": "success",
    "name": user.name,
    "username": user.username,
    "email": user.email,
  } )
} );


module.exports = router;