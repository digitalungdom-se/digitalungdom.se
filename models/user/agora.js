const MongoClient = require( 'mongodb' ).MongoClient;
const ObjectID = require( 'mongodb' ).ObjectID;

// Post includes posts|link posts|questions

// Used to validate if the agoragram was posted by the requesting user
module.exports.validateAuthorById = async function( id, postId ) {
  const validation = await db.collection( 'agoragrams' ).findOne( { '_id': ObjectId( postId ), 'author': ObjectId( id ) } );

  if ( validation ) return true;
  else return false;
}

// Post post/comment
module.exports.agorize = async function( id, agoragramData ) {
  // Unpacks the agoragram data
  agoragram[ 'author' ] = ObjectID( id );
  agoragram[ 'type' ] = agoragramData.type;
  if ( postAs ) agoragram[ 'group' ] = agoragramData.group;
  if ( badges ) agoragram[ 'badges' ] = agoragramData.badges;
  agoragram[ 'modified' ] = false;
  agoragram[ 'body' ] = agoragramData.body;
  agoragram[ 'stars' ] = 0;
  agoragram[ 'children' ] = [];

  // Adds agoragram type specific fields, e.g. title for normal posts and replyTo for comments
  if ( [ 'post', 'link', 'question' ].includes( agoragramData.type ) ) {
    agoragram[ 'title' ] = agoragramData.title;
    agoragram[ 'tags' ] = agoragramData.tags;
  } else {
    agoragram[ 'post' ] = agoragramData.post;
    agoragram[ 'replyTo' ] = agoragramData.replyTo;
  }

  await db.collection( 'agoragrams' ).insertOne( agoragram );
}

// Remove post/comment
module.exports.antiAgorize = async function( postId ) {
  // Unsets (deletes) all identifying fields apart from title and updates the modified field
  unsetAgoragram[ 'author' ] = true;
  unsetAgoragram[ 'group' ] = true;
  unsetAgoragram[ 'badges' ] = true;
  unsetAgoragram[ 'body' ] = true;

  setAgoragram[ 'modified' ] = new Date();

  return await db.collection( 'agoragrams' ).findOneAndUpdate( { '_id': ObjectId( postId ) }, { '$set': setAgoragram, '$unset': unsetAgoragram }, { 'projection': { '_id': 1 } } )._id;
}

// Edit post/comment
module.exports.metaAgorize = async function( postId, agoragramData ) {
  // Sets the new comments body and add that it has been modified
  setAgoragram[ 'body' ] = agoragramData.body;
  setAgoragram[ 'modified' ] = new Date();

  return await db.collection( 'agoragrams' ).findOneAndUpdate( { '_id': ObjectId( postId ), 'type': { '$in': [ 'post', 'question', 'comment' ] } }, { '$set': setAgoragram }, { 'projection': { '_id': 1 } } )._id;
}

// Like post/comment
module.exports.asteri = async function( id, starId ) {
  // Checks if the user has already rated this post, if it hasn't the query will result in undefined.
  // Also retrieves if the post even exists

  const starredComment = await db.collection( 'agoragrams' ).findOne( { '_id': ObjectId( starId ), 'starredBy': ObjectId( id ) }, { 'projection': { '_id': 1, 'starredBy.$': 1 } } );

  // Checks if exists
  if ( !starredComment._id ) return false;

  // Checks if the user has rated the post or not
  if ( starredComment.starredBy ) {
    // If the user hasn't starred the post/comment
    agoragramStar[ `$push.starredBy` ] = ObjectId( id );
    agoragramStar[ `$inc.stars` ] = 1;
    star = 1;
  } else {
    // If the user has starred the post/comment, i.e. unstar it.
    agoragramStar[ `$pull.starredBy` ] = ObjectId( id );
    agoragramStar[ `$inc.stars` ] = -1;
    star = -1;
  }

  // Gets the replyToId (only comments have this field) and increments it's stars at the same time. Database god.
  const replyToId = await db.collection( 'agoragrams' ).findOneAndUpdate( { '_id': ObjectId( starId ) }, agoragramStar, { 'projection': { '_id': 0, 'replyTo': 1 } } ).replyTo;

  // Checks if it is a comment. Then updates that comments parents children array then sorts it (only if the starred comment's stars is larger than the next one).
  // This process is done to accelerate front-end sorted tree building.
  if ( replyToId ) {
    // Gets all the starred comments siblings and increments the starred comments stars in the parents child array. database god.
    let children = db.collection( 'agoragrams' ).findOneAndUpdate( { '_id': ObjectId( postId ), "children._id": ObjectId( replyToId ) }, { '$inc': { "children.$.stars": star } }, { 'projection': { '_id': 0, 'children': 1 }, 'returnNewDocument': true } ).children;

    // Fetches the index of starred comment in sibling array
    const startPostIndex = children.findIndex( function( child ) {
      return child[ '_id' ] === ObjectId( replyToId );
    } );

    // Change if statement to a try/catch statement? The following code will only throw an error if index is out of range. If it catches the error just ignore it. Faster? More elegant?
    // ( startPostIndex !== 0 && star !== 1 ) makes sure that the index will not < 0
    // ( startPostIndex !== ( children.length - 1 ) && star !== -1 ) makes sure that the index will not be out of range.
    // If it is the most starred comment, and gets starred, we do not need to check if it is the most starred comment again
    // Same but opposite if it is the least starred comment and gets unstarred
    if ( ( startPostIndex !== 0 && star !== 1 ) || ( startPostIndex !== ( children.length - 1 ) && star !== -1 ) ) {
      // Fetches the rival comments index, i.e. the next sibling comment with more starss
      const startPostRivalIndex = startPostIndex - star;

      // Switches place with the two rival comments if the starred comment has more star
      if ( children[ startPostIndex ].stars > children[ startPostRivalIndex ].stars > ) {
        let tmp = children[ startPostIndex ];
        children[ startPostIndex ] = children[ startPostRivalIndex ];
        children[ startPostRivalIndex ] = tmp;

        await db.collection( 'agoragrams' ).updateOne( { '_id': ObjectId( postId ) }, { '$set': { "children": children } } )
      }
    }
  }
}

// Get all new posts
module.exports.getAgoragramsNew = async function( dateAfter, dateBefore ) {
  const hexSecondsAfter = Math.floor( dateAfter / 1000 ).toString( 16 );
  const objectIdAfter = ObjectId( hexSecondsAfter + "0000000000000000" );

  const hexSecondsBefore = Math.floor( dateBefore / 1000 ).toString( 16 );
  const objectIdBefore = ObjectId( hexSecondsBefore + "0000000000000000" );

  return await db.collection( 'agoragrams' ).find( { '_id': { '$gte': objectIdAfter, '$lte': objectIdBefore } } ).limit( 10 ).sort( '_id': -1 ).toArray();
}

module.exports.getAgoragramsTop = async function( dateAfter, dateBefore ) {
  const hexSecondsAfter = Math.floor( dateAfter / 1000 ).toString( 16 );
  const objectIdAfter = ObjectId( hexSecondsAfter + "0000000000000000" );

  const hexSecondsBefore = Math.floor( dateBefore / 1000 ).toString( 16 );
  const objectIdBefore = ObjectId( hexSecondsBefore + "0000000000000000" );

  return await db.collection( 'agoragrams' ).find( { '_id': { '$gte': objectIdAfter, '$lte': objectIdBefore } } ).sort( 'rating': -1 ).limit( 10 ).toArray();
}