const express = require( 'express' );
const router = express.Router();

const checkUsername = require( './../../../models/check' ).checkUsername;

router.post( '/register_check_username', async function( req, res ) {
  const username = req.body.username;
  if ( typeof username != 'string' ) return res.send( { username: false } );

  return res.send( { username: await checkUsername( db, username ) } );
} );

module.exports = router;