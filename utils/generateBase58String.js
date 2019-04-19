module.exports = function generateBase58String( digits = 0 ) {
  const base58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'.split( '' );

  let result = '';
  let char;

  while ( result.length < digits ) {
    char = base58[ Math.random() * 57 >> 0 ];

    if ( result.indexOf( char ) === -1 ) result += char;
    if ( result.indexOf( 'Qm' ) > -1 ) result = '';
  }

  return result;
};