const express = require( 'express' );
const router = express.Router();
const validator = require( 'validator' );

const handleError = require( './../../../helpers/handleError' ).handleError;

const checkEmail = require( './../../../models/check' ).checkEmail;

router.post( '/register_check_email', async function( req, res ) {
  try {
    const email = req.body.email;
    if ( typeof email != 'string' ) return false;
    if ( !validator.isEmail( email ) ) return false;

    return res.send( await checkEmail( db, email ) );
  } catch ( e ) {
    handleError( e );
  }
} );

module.exports = router;