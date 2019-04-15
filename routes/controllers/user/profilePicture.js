/* global include */

const validateProfilePicture = include( 'utils/validateProfilePicture' ).validateProfilePicture;
const setProfilePicture = include( 'models/user/set' ).setProfilePicture;

module.exports.uploadProfilePicture = async function( req, res ) {
  const id = req.user;
  if ( !req.files && !req.files.profilePicture ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'no files uploaded' } );

  const profilePictureBuffer = req.files.profilePicture.data;
  const pictureValidation = await validateProfilePicture( profilePictureBuffer, req.files.profilePicture.truncated );

  if ( pictureValidation.error ) return res.status( 400 ).send( { 'type': 'fail', 'reason': pictureValidation.reason } );

  await setProfilePicture( id, profilePictureBuffer );

  return res.status( 201 ).send( { 'type': 'success' } );
};