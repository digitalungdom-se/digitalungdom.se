/* global db include*/

const ObjectID = require( 'mongodb' ).ObjectID;
const generateBase58String = include( 'utils/generateBase58String' );
// Post includes text|link posts|questions

// Used to validate if the agoragram was posted by the requesting user
module.exports.validateAuthorById = async function ( candidateId, postId ) {
  const authorId = await db.collection( 'agoragrams' ).findOne( { '_id': ObjectID( postId ) }, { '_id': 0, 'author': 1 } ).author;

  if ( authorId.toString() === candidateId ) return true;
  else return false;
};

// Post post/comment
module.exports.agorize = async function ( id, agoragramData ) {
  // Initiate query array, array that withholds queries that will be called async later.
  const queryArray = [];

  // Unpacks the general agoragram data
  let agoragram = { ...agoragramData.general };

  const agoragramId = ObjectID();
  agoragram[ '_id' ] = agoragramId;
  agoragram[ 'shortId' ] = generateBase58String( 7 );
  agoragram[ 'author' ] = ObjectID( id );

  agoragram[ 'modified' ] = false;
  agoragram[ 'stars' ] = 0;
  agoragram[ 'children' ] = [];
  agoragram[ 'pinned' ] = false;
  agoragram[ 'deleted' ] = false;

  // Adds agoragram type specific fields, e.g. title for normal posts and replyTo for comments
  if ( [ 'text', 'link', 'question' ].includes( agoragram.type ) ) {
    agoragram = { ...agoragram, ...agoragramData.post };
    agoragram[ 'commentAmount' ] = 0;

    queryArray.push( db.collection( 'users' ).updateOne( { '_id': ObjectID( id ) }, { $inc: { 'agora.score.posts': 1 } } ) );
  } else {
    const replyToId = ObjectID( agoragramData.comment.replyTo );

    const replyExists = await db.collection( 'agoragrams' ).findOneAndUpdate( {
      '_id': replyToId
    }, {
      '$push': { 'children': agoragramId }
    }, {
      'projection': { '_id': 1, 'type': 1, 'post': 1 }
    } );


    if ( !replyExists.value ) return { 'error': 'replyTo does not exist', 'replyTo': replyToId };

    agoragram[ 'post' ] = {};
    if ( replyExists.value.type === 'comment' ) {
      agoragram[ 'post' ][ 'id' ] = replyExists.value.post.id;
      agoragram[ 'post' ][ 'shortId' ] = replyExists.value.post.shortId;
    } else {
      agoragram[ 'post' ][ 'id' ] = replyExists.value._id;
      agoragram[ 'post' ][ 'shortId' ] = replyExists.value.shortId;
    }

    agoragram[ 'replyTo' ] = replyToId;

    queryArray.push( db.collection( 'agoragrams' ).updateOne( {
      '_id': ObjectID( agoragram.post.id )
    }, {
      '$inc': { 'commentAmount': 1 }
    } ) );

    queryArray.push( db.collection( 'users' ).updateOne( { '_id': ObjectID( id ) }, { $inc: { 'agora.score.comments': 1 } } ) );
  }

  queryArray.push( db.collection( 'agoragrams' ).insertOne( agoragram ) );
  await Promise.all( queryArray );

  return { 'error': false };
};

// Remove post/comment
module.exports.antiAgorize = async function ( candidateId, postId ) {
  // Unsets (deletes) all identifying fields apart from title and updates the modified field
  const unsetAgoragram = {};
  const setAgoragram = {};

  unsetAgoragram[ 'author' ] = true;
  unsetAgoragram[ 'display' ] = true;
  unsetAgoragram[ 'body' ] = true;

  setAgoragram[ 'modified' ] = new Date();
  setAgoragram[ 'deleted' ] = true;
  const updated = await db.collection( 'agoragrams' ).updateOne( {
    '_id': ObjectID( postId ),
    'author': ObjectID( candidateId )
  }, {
    '$set': setAgoragram,
    '$unset': unsetAgoragram
  } );

  if ( updated.result.nModified ) return { 'error': false };
  else return { 'error': 'unauthorised, post does not exist, or post already deleted' };
};

// Edit post/comment
module.exports.metaAgorize = async function ( candidateId, postId, body ) {
  // Sets the new comments body and add that it has been modified
  const setAgoragram = {};
  setAgoragram[ 'body' ] = body;
  setAgoragram[ 'modified' ] = new Date();

  const updated = await db.collection( 'agoragrams' ).updateOne( {
    '_id': ObjectID( postId ),
    'author': ObjectID( candidateId ),
    'type': { '$in': [ 'text', 'question', 'comment' ] },
  }, {
    '$set': setAgoragram
  } );

  if ( updated.result.nModified ) return { 'error': false };
  else return { 'error': 'unauthorised, post does not exist, or post is uneditable' };
};

// Like post/comment
module.exports.asteri = async function ( id, starId ) {
  // Checks if the user has already rated this post, if it hasn't the query will result in undefined.
  // Also retrieves if the post even exists

  let queryArray = [];

  const starredAgoragram = await db.collection( 'agoragrams' ).findOne( { '_id': ObjectID( starId ) } );

  // Checks if exists
  if ( !starredAgoragram._id ) return { 'error': 'agoragram does not exist' };
  let starredByUser = await db.collection( 'users' ).updateOne( { '_id': ObjectID( id ) }, { $addToSet: { 'agora.starredAgoragrams': ObjectID( starId ) } } );
  starredByUser = !( starredByUser.result.nModified );

  // Checks if the user has rated the post or not
  let star = 0;
  if ( starredByUser ) {
    // If the user has starred the post/comment, i.e. unstar it.
    queryArray.push( db.collection( 'users' ).updateOne( { '_id': ObjectID( id ) }, { $pull: { 'agora.starredAgoragrams': ObjectID( starId ) } } ) );
    star = -1;
  } else star = 1;

  if ( starredAgoragram.author ) {
    const authorId = starredAgoragram.author;
    queryArray.push( db.collection( 'users' ).updateOne( { '_id': authorId }, { $inc: { 'agora.score.stars': star } } ) );
  }

  // Gets the replyToId (only comments have this field) and increments it's stars at the same time. Database god.
  queryArray.push( db.collection( 'agoragrams' ).findOneAndUpdate( {
    '_id': ObjectID( starId )
  }, {
    $inc: { 'stars': star }
  }, {
    'projection': { '_id': 0, 'replyTo': 1 }
  } ) );

  let starredPost = ( await Promise.all( queryArray ) )[ queryArray.length - 1 ];
  queryArray = [];

  // Checks if it is a comment. Then updates that comments parents children array then sorts it (only if the starred comment's stars is larger than the next one).
  // This process is done to accelerate front-end sorted tree building.
  if ( starredPost.value && starredPost.value.replyTo ) {
    const replyToId = starredPost.value.replyTo;
    // Gets all the starred comments siblings and increments the starred comments stars in the parents child array. database god.
    let children = ( db.collection( 'agoragrams' ).findOneAndUpdate( {
      '_id': ObjectID( replyToId ),
      'children._id': ObjectID( starId )
    }, {
      '$inc': { 'children.$.stars': star }
    }, {
      'projection': { '_id': 0, 'children': 1 },
      'returnOriginal': false
    } ) ).value.children;

    // Fetches the index of starred comment in sibling array
    const startPostIndex = children.findIndex( function ( child ) {
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

        await db.collection( 'agoragrams' ).updateOne( { '_id': ObjectID( replyToId ) }, { '$set': { 'children': children } } );
      }
    }
  }
  // return if it starred or unstarred the post
  const action = star === 1 ? 'starred' : 'unstarred';
  return { 'error': false, action };
};

// Get all new posts
module.exports.getAgoragrams = async function ( hexSecondsAfter, hexSecondsBefore, sort, hypagora ) {
  const objectIDAfter = ObjectID( hexSecondsAfter + '0000000000000000' );
  const objectIDBefore = ObjectID( hexSecondsBefore + '0000000000000000' );

  // only get agoragrams from specific hypagora or all
  let getAgoragramFilter = {};
  if ( hypagora === 'general' || !hypagora ) getAgoragramFilter = { '_id': { '$gte': objectIDAfter, '$lte': objectIDBefore }, 'type': { '$in': [ 'text', 'link', 'question' ] } };
  else getAgoragramFilter = { '_id': { '$gte': objectIDAfter, '$lte': objectIDBefore }, 'hypagora': ObjectID( hypagora ), 'type': { '$in': [ 'text', 'link', 'question' ] } };

  if ( sort === 'new' ) return await db.collection( 'agoragrams' ).find( getAgoragramFilter ).limit( 10 ).sort( { '_id': -1 } ).toArray();
  else if ( sort === 'top' ) return await db.collection( 'agoragrams' ).find( getAgoragramFilter ).sort( { 'rating': -1 } ).limit( 10 ).toArray();
  else return null;
};

// Get single post
module.exports.getAgoragramById = async function ( postId ) {
  return await db.collection( 'agoragrams' ).find( { '$or': [ { '_id': ObjectID( postId ) }, { 'post': ObjectID( postId ) } ] } ).toArray();
};

// Get single post
module.exports.getAgoragramByShortId = async function ( postId ) {
  return await db.collection( 'agoragrams' ).find( { '$or': [ { 'shortId': postId }, { 'post': postId } ] } ).toArray();
};
// Check if starred
module.exports.checkStarredAgoragrams = async function ( userId, starredList ) {
  userId = ObjectID( userId );

  const list = await db.collection( 'users' ).aggregate( [
    { $match: { '_id': userId } },
    {
      $project: {
        'agora.starredAgoragrams': {
          $filter: {
            input: '$starredAgoragrams',
            as: 'agoragram',
            cond: { $in: [ '$$agoragram', starredList ] }
          }
        },
        _id: 0
      }
    }
  ] );

  console.log( list );
};