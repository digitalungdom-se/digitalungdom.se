const { promisify } = require( 'util' );
const fileType = require( 'file-type' );
const sizeOf = promisify( require( 'image-size' ) );

const setProfilePicture = require( './../../models/user/set' ).setProfilePicture;

async function validateProfilePicuture( buffer, truncated ) {
  if ( [ 'image/png', 'image/jpg', 'image/gif' ].indexOf( ( fileType( buffer ) ).mime ) === -1 ) return { 'error': true, 'reason': 'incorrect mimetype' };
  if ( truncated || buffer.toString( 'ascii' ).length > 1048576 ) return { 'error': true, 'reason': 'image is too large' };

  const dimensions = await sizeOf( buffer )
  if ( dimensions.width > 1000 || dimensions.height > 1000 || dimensions.width / dimensions.height !== 1 ) return { 'error': true, 'reason': 'incorrect image dimensions' };

  return { 'error': false }
}

module.exports.validateProfilePicuture = validateProfilePicuture;

module.exports.uploadProfilePicture = async function( req, res ) {
  const id = req.user;
  if ( !req.files.profilePicture ) return res.status( 400 ).send( { "type": "fail", "reason": "no files uploaded" } );

  const profilePictureBuffer = req.files.profilePicture.data;
  const pictureValidation = await validateProfilePicuture( profilePictureBuffer, req.files.profilePicture.truncated );

  if ( pictureValidation.error ) return res.status( 400 ).send( { "type": "fail", "reason": pictureValidation.reason } );

  const status = await setProfilePicture( id, profilePictureBuffer );

  if ( status ) {
    return res.status( 201 ).send( { 'type': 'success' } );
  } else {
    return res.status( 500 ).send( { 'type': 'fail', 'reason': 'internal server error' } );
  }
}