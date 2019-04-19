const { promisify } = require( 'util' );
const fileType = require( 'file-type' );
const sizeOf = promisify( require( 'image-size' ) );

module.exports.validateProfilePicuture = async function( buffer, truncated ) {
  if ( truncated || buffer.toString( 'ascii' ).length > 1048576 ) return { 'error': true, 'reason': 'image is too large' };
  if ( [ 'image/png', 'image/jpg', 'image/gif' ].indexOf( ( fileType( buffer ) ).mime ) === -1 ) return { 'error': true, 'reason': 'incorrect mimetype' };

  const dimensions = await sizeOf( buffer );
  if ( dimensions.width > 1000 || dimensions.height > 1000 || dimensions.width / dimensions.height !== 1 ) return { 'error': true, 'reason': 'incorrect image dimensions' };

  return { 'error': false };
};