const validator = require( 'validator' );

let blogPost = '😀';
for ( let i = 0; i < 10000; i++ ) blogPost += '😀';

if ( typeof blogPost != 'string' ) return console.log( 'Undefined' );
if ( !validator.isLength( blogPost, { min: 10, max: 10000 } ) ) return console.log( 'blogPost length', blogPost.length );

console.log( 'validated' );