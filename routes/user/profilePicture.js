const validateProfilePicuture = require( '../../helpers/validateProfilePicture' ).validateProfilePicture;
const setProfilePicture = require( 'models/user/set' ).setProfilePicture;

module.exports.uploadProfilePicture = async function( req, res ) {
  const id = req.user;
  if ( !req.files.profilePicture ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'no files uploaded' } );

  const profilePictureBuffer = req.files.profilePicture.data;
  const pictureValidation = await validateProfilePicuture( profilePictureBuffer, req.files.profilePicture.truncated );

  if ( pictureValidation.error ) return res.status( 400 ).send( { 'type': 'fail', 'reason': pictureValidation.reason } );

  const status = await setProfilePicture( id, profilePictureBuffer );

  if ( status ) {
    return res.status( 201 ).send( { 'type': 'success' } );
  } else {
    return res.status( 500 ).send( { 'type': 'fail', 'reason': 'internal server error' } );
  }
};