const express = require( 'express' );
const router = express.Router();
const validator = require( 'validator' );

const checkEmail = require( './../../../models/check' ).checkEmail;

router.post( '/register_check_email', async function( req, res ) {
  const email = req.body.email;
  if ( typeof email != 'string' ) return res.send( { email: false } );
  if ( !validator.isEmail( email ) ) return res.send( { email: false } );

  return res.send( { email: await checkEmail( db, email ) } );
} );

module.exports = router;