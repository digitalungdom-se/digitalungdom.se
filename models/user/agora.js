const MongoClient = require( 'mongodb' ).MongoClient;
const ObjectID = require( 'mongodb' ).ObjectID;

// Post includes posts|link posts|questions

// Used to validate if the agoragram was posted by the requesting user
module.exports.validateAuthorById = async function( id, postId, type ) {
  if ( postType === 'post' || postType === 'link' || postType === 'question' ) {
    collection = 'agoragrams';
  } else {
    collection = 'comments';
  }
  const validation = await db.collection( collection ).findOne( { '_id': ObjectId( postId ), 'author': ObjectId( id ) } );

  if ( validation ) return true;
  else return false;
}

// Post post/comment
module.exports.agorize = async function( id, agoragramData ) {
  agoragram[ 'author' ] = ObjectID( id );
  agoragram[ 'body' ] = agoragramData.body;
  agoragram[ 'modified' ] = false;
  agoragram[ 'rating' ] = 0;
  if ( postAs ) agoragram[ 'authorRole' ] = agoragramData.author;
  if ( badges ) agoragram[ 'badges' ] = agoragramData.badges;
  let collection;

  if ( agoragramData.type === 'post' || agoragramData.type === 'link' ) {
    agoragram[ 'type' ] = agoragram.type;
    agoragram[ 'title' ] = agoragramData.title;
    agoragram[ 'commentMap' ] = {};
    agoragram[ 'tags' ] = agoragramData.tags;
    collection = 'agoragrams';
  } else {
    agoragram[ 'post' ] = agoragramData.post;
    collection = 'comments';
  }

  await db.collection( collection ).insertOne( agoragram );
}

// Remove post/comment
module.exports.antiAgorize = async function( postId, postType ) {
  agoragram[ 'author' ] = '';
  agoragram[ 'body' ] = '';
  agoragram[ 'modified' ] = new Date();
  agoragram[ 'authorRole' ] = '';
  agoragram[ 'badges' ] = '';
  let collection;

  if ( postType === 'post' || postType === 'link' ) {
    collection = 'agoragrams';
  } else {
    collection = 'comments';
  }

  await db.collection( collection ).updateOne( { '_id': ObjectId( postId ) }, agoragram );
}

// Edit post/comment
module.exports.metaAgorize = async function( postId, agoragramData ) {
  agoragram[ 'body' ] = agoragramData.body;
  agoragram[ 'modified' ] = new Date();
  let collection;

  if ( postType === 'post' || postType === 'link' || postType === 'question' ) {
    collection = 'agoragrams';
  } else {
    collection = 'comments';
  }

  await db.collection( collection ).updateOne( { '_id': ObjectId( postId ) }, agoragram );
}

// Like post/comment
module.exports.asteri = async function( id, postId, postType, commentId ) {
  // Due to the db structure, when starring the actual post it will add
  if ( !commentId ) commentId = 'post';

  // Checks if the user has already rated this post, if it hasn't the query will result in undefined.
  let userQuery = {};
  userQuery[ '_id' ] = ObjectId( id );
  userQuery[ `rating.${postId}.${commentId}` ] { '$exists': true };
  const userRating = await db.collection( 'users' ).findOne( userQuery );

  let updateId;
  let collection;
  let userUpdate;
  let rating;

  if ( userRating ) {
    // If the user hasn't starred the post/comment
    userUpdate[ `$set.rating.${postId}.${commentId}$` ] = true;
    rating = 1;

    if ( postType === 'post' || postType === 'link' || postType === 'question' ) {
      updateId = postId;
      collection = 'agoragrams';
    } else {
      updateId = commentId;
      collection = 'comments';
    }
  } else {
    // If the user has starred the post/comment, i.e. unstar it.
    userUpdate[ `$unset.rating.${postId}.${commentId}$` ] = false;
    rating = -1;

    if ( postType === 'post' || postType === 'link' || postType === 'question' ) {
      updateId = postId;
      collection = 'agoragrams';
    } else {
      updateId = commentId;
      collection = 'comments';
    }
  }
  await Promise.all( [
    db.collection( collection ).updateOne( { '_id': ObjectId( updateId ) }, { '$inc' { 'rating': rating } } ),
    db.collection( 'users' ).updateOne( { '_id': ObjectId( id ) }, userUpdate )
  ] );
}