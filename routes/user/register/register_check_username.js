const express = require( 'express' );
const router = express.Router();

const handleError = require( './../../../helpers/handleError' ).handleError;

const checkUsername = require( './../../../models/check' ).checkUsername;

router.post( '/register_check_username', async function( req, res ) {
  try {
    const username = req.body.username;
    if ( typeof username != 'string' ) return false;

    return res.send( { username: await checkUsername( db, username ) } );
  } catch ( e ) {
    handleError( req, res, e )
  }
} );

module.exports = router;