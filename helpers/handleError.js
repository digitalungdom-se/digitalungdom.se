module.exports.handleError = async function( res, res, error ) {
  res.status( 404 ).send( "Oj uhmmm, något gick fel?" );
  console.error( error );
}