const MongoClient = require( 'mongodb' ).MongoClient;
const ObjectID = require( 'mongodb' ).ObjectID;

const getAgoragramProjection = {
  '_id': 1,
  'type': 1,
  'author': 1,
  'group': 1,
  'badges': 1,
  'modified': 1,
  'body': 1,
  'stars': 1,
  'children': 1,
  'pinned': 1,

  'title': 1,
  'tags': 1,
  'commentAmount': 1,

  'post': 1,
}

// Post includes text|link posts|questions

// Used to validate if the agoragram was posted by the requesting user
module.exports.validateAuthorById = async function( id, postId ) {
  const validation = await db.collection( 'agoragrams' ).findOne( { '_id': ObjectID( postId ), 'author': ObjectID( id ) } );

  if ( validation ) return true;
  else return false;
}

// Post post/comment
module.exports.agorize = async function( id, agoragramData ) {
  // Unpacks the agoragram data
  const agoragram = {};
  const agoragramId = ObjectID();
  agoragram[ '_id' ] = agoragramId;
  agoragram[ 'author' ] = ObjectID( id );
  agoragram[ 'type' ] = agoragramData.type;
  if ( agoragramData.group ) agoragram[ 'group' ] = agoragramData.group;
  else if ( agoragramData.badges ) agoragram[ 'badges' ] = agoragramData.badges;
  agoragram[ 'modified' ] = false;
  agoragram[ 'body' ] = agoragramData.body;
  agoragram[ 'stars' ] = 0;
  agoragram[ 'starredBy' ] = [];
  agoragram[ 'children' ] = [];
  agoragram[ 'pinned' ] = false;
  agoragram[ 'deleted' ] = false;

  // Initiate query array, array that withholds queries that will be called async later.
  const queryArray = [];

  // Adds agoragram type specific fields, e.g. title for normal posts and replyTo for comments
  if ( [ 'text', 'link', 'question' ].includes( agoragramData.type ) ) {
    agoragram[ 'title' ] = agoragramData.title;
    agoragram[ 'tags' ] = agoragramData.tags;
    agoragram[ 'commentAmount' ] = 0;
  } else {
    const replyExists = await db.collection( 'agoragrams' ).findOneAndUpdate( { '_id': ObjectID( agoragramData.replyTo ) }, { '$push': { 'children': agoragramId } }, { 'projection': { '_id': 1, 'type': 1, 'post': 1 } } );
    if ( !replyExists.value ) return { 'error': true, 'reason': `replyTo does not exist`, 'replyTo': agoragramData.replyTo };
    else if ( replyExists.value.type === 'comment' ) agoragram[ 'post' ] = replyExists.value.post;
    else agoragram[ 'post' ] = replyExists.value._id;

    queryArray.push( db.collection( 'agoragrams' ).findOneAndUpdate( { '_id': ObjectID( agoragram.post ) }, { '$inc': { 'commentAmount': 1 } }, { 'projection': { '_id': 1 } } ) );
  }

  queryArray.push( db.collection( 'agoragrams' ).insertOne( agoragram ) );
  return await Promise.all( queryArray )
}

// Remove post/comment
module.exports.antiAgorize = async function( postId ) {
  // Unsets (deletes) all identifying fields apart from title and updates the modified field
  const unsetAgoragram = {};
  const setAgoragram = {};

  unsetAgoragram[ 'author' ] = true;
  unsetAgoragram[ 'group' ] = true;
  unsetAgoragram[ 'badges' ] = true;
  unsetAgoragram[ 'body' ] = true;

  setAgoragram[ 'modified' ] = new Date();
  setAgoragram[ 'deleted' ] = true;
  const exists = await db.collection( 'agoragrams' ).findOneAndUpdate( { '_id': ObjectID( postId ) }, { '$set': setAgoragram, '$unset': unsetAgoragram }, { 'projection': { '_id': 0, 'deleted': 1 } } );

  if ( exists.value ) return exists.value.deleted;
  else return null;
}

// Edit post/comment
module.exports.metaAgorize = async function( postId, agoragramData ) {
  // Sets the new comments body and add that it has been modified
  const setAgoragram = {};
  setAgoragram[ 'body' ] = agoragramData.body;
  setAgoragram[ 'modified' ] = new Date();

  const exists = await db.collection( 'agoragrams' ).findOneAndUpdate( { '_id': ObjectID( postId ), 'type': { '$in': [ 'post', 'question', 'comment' ] } }, { '$set': setAgoragram }, { 'projection': { '_id': 0, 'modified': 1 }, 'returnOriginal': false } );

  if ( exists.value ) return exists.value.modified;
  else return null;
}

// Like post/comment
module.exports.asteri = async function( id, starId ) {
  // Checks if the user has already rated this post, if it hasn't the query will result in undefined.
  // Also retrieves if the post even exists

  const starredComment = await db.collection( 'agoragrams' ).findOne( { '_id': ObjectID( starId ), 'starredBy': ObjectID( id ) }, { 'projection': { '_id': 1, 'starredBy.$': 1 } } );

  // Checks if exists
  if ( !starredComment._id ) return false;

  // Checks if the user has rated the post or not
  if ( starredComment.starredBy ) {
    // If the user hasn't starred the post/comment
    agoragramStar[ `$push.starredBy` ] = ObjectID( id );
    agoragramStar[ `$inc.stars` ] = 1;
    star = 1;
  } else {
    // If the user has starred the post/comment, i.e. unstar it.
    agoragramStar[ `$pull.starredBy` ] = ObjectID( id );
    agoragramStar[ `$inc.stars` ] = -1;
    star = -1;
  }

  // Gets the replyToId (only comments have this field) and increments it's stars at the same time. Database god.
  const replyToId = await db.collection( 'agoragrams' ).findOneAndUpdate( { '_id': ObjectID( starId ) }, agoragramStar, { 'projection': { '_id': 0, 'replyTo': 1 } } ).replyTo;

  // Checks if it is a comment. Then updates that comments parents children array then sorts it (only if the starred comment's stars is larger than the next one).
  // This process is done to accelerate front-end sorted tree building.
  if ( replyToId ) {
    // Gets all the starred comments siblings and increments the starred comments stars in the parents child array. database god.
    let children = db.collection( 'agoragrams' ).findOneAndUpdate( { '_id': ObjectID( postId ), 'children._id': ObjectID( replyToId ) }, { '$inc': { 'children.$.stars': star } }, { 'projection': { '_id': 0, 'children': 1 }, 'returnOriginal': false } ).children;

    // Fetches the index of starred comment in sibling array
    const startPostIndex = children.findIndex( function( child ) {
      return child[ '_id' ] === ObjectID( replyToId );
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
      if ( children[ startPostIndex ].stars > children[ startPostRivalIndex ].stars ) {
        let tmp = children[ startPostIndex ];
        children[ startPostIndex ] = children[ startPostRivalIndex ];
        children[ startPostRivalIndex ] = tmp;

        await db.collection( 'agoragrams' ).updateOne( { '_id': ObjectID( postId ) }, { '$set': { 'children': children } } )
      }
    }
  }
}

// Get all new posts
module.exports.getAgoragrams = async function( hexSecondsAfter, hexSecondsBefore, sort, id ) {
  const objectIDAfter = ObjectID( hexSecondsAfter + '0000000000000000' );
  const objectIDBefore = ObjectID( hexSecondsBefore + '0000000000000000' );

  if ( id ) getAgoragramProjection[ 'starredby\.$' ] = ObjectID( id );

  if ( sort === 'new' ) return await db.collection( 'agoragrams' ).find( { '_id': { '$gte': objectIDAfter, '$lte': objectIDBefore }, 'type': { '$in': [ 'text', 'link', 'question' ] } }, { 'projection': {} } ).limit( 10 ).sort( { '_id': -1 } ).toArray();
  else if ( sort === 'top' ) return await db.collection( 'agoragrams' ).find( { '_id': { '$gte': objectIDAfter, '$lte': objectIDBefore }, 'type': { '$in': [ 'text', 'link', 'question' ] } }, { 'projection': {} } ).sort( { 'rating': -1 } ).limit( 10 ).toArray();
  else return null;
}

module.exports.getAgoragram = async function( postId, id ) {
  if ( id ) getAgoragramProjection[ 'starredby\.$' ] = ObjectID( id );

  return await db.collection( 'agoragrams' ).find( { '$or': [ { '_id': ObjectID( postId ) }, { 'post': ObjectID( postId ) } ] }, { 'projection': {} } ).toArray();
}