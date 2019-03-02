const validator = require( 'validator' );
const validateObjectID = require( 'mongodb' ).ObjectID.isValid;

const asteri = require( './../../../models/user/agora' ).asteri;

//router.post( '/asteri', ensureUserAuthenticated,

module.exports.asteri = async function( req, res ) {
  // Fetches all the fields and their values
  const id = req.user;
  const postId = req.body.postId;

  if ( !validateObjectID( postId ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'postId is not an objectID', postId } );

  await asteri( id, postId );
}