/* global db include*/

const ObjectID = require( 'mongodb' ).ObjectID;
const generateBase58String = include( 'utils/generateBase58String' );

// Post includes text|link posts|questions
// Used to validate if the agoragram was published by the requesting user
module.exports.validateAuthorByID = async function ( userID, agoragramID ) {
  const authorID = await db.collection( 'agoragrams' ).findOne( { '_id': ObjectID( agoragramID ) }, { '_id': 0, 'author': 1 } ).author;

  if ( authorID.toString() === userID ) return true;
  else return false;
};

// Publish an agoragram
module.exports.agorize = async function ( userID, agoragramData ) {
  userID = ObjectID( userID );
  // Initiate query array, array that withholds queries that will be called async later.
  const queryArray = [];

  // Unpacks the general agoragram data
  let agoragram = { ...agoragramData.general };

  const agoragramID = ObjectID();
  agoragram[ '_id' ] = agoragramID;
  agoragram[ 'shortID' ] = generateBase58String( 7 );
  agoragram[ 'author' ] = userID;

  agoragram[ 'modified' ] = false;
  agoragram[ 'stars' ] = 0;
  agoragram[ 'children' ] = [];
  agoragram[ 'pinned' ] = false;
  agoragram[ 'deleted' ] = false;
  agoragram[ 'reports' ] = [];

  // Adds agoragram type specific fields, e.g. title for normal posts and replyTo for comments
  if ( [ 'text', 'link', 'question' ].includes( agoragram.type ) ) {
    agoragram = { ...agoragram, ...agoragramData.post };
    agoragram[ 'commentAmount' ] = 0;

    queryArray.push( db.collection( 'users' ).updateOne( { '_id': userID }, { $inc: { 'agora.score.posts': 1 } } ) );
  } else {
    const replyToID = ObjectID( agoragramData.comment.replyTo );

    const replyExists = await db.collection( 'agoragrams' ).findOneAndUpdate( {
      '_id': replyToID
    }, {
      '$push': { 'children': agoragramID }
    }, {
      'projection': { '_id': 1, 'type': 1, 'post': 1, 'shortID': 1 }
    } );


    if ( !replyExists.value ) return { 'error': 'replyTo does not exist', 'fields': [ 'replyToID' ], 'return': { 'replyTo': agoragramData.comment.replyTo } };

    agoragram[ 'post' ] = {};
    if ( replyExists.value.type === 'comment' ) {
      agoragram[ 'post' ][ 'id' ] = replyExists.value.post.id;
      agoragram[ 'post' ][ 'shortID' ] = replyExists.value.post.shortID;
    } else {
      agoragram[ 'post' ][ 'id' ] = replyExists.value._id;
      agoragram[ 'post' ][ 'shortID' ] = replyExists.value.shortID;
    }

    agoragram[ 'replyTo' ] = replyToID;

    queryArray.push( db.collection( 'agoragrams' ).updateOne( {
      '_id': agoragram.post.id
    }, {
      '$inc': { 'commentAmount': 1 }
    } ) );

    queryArray.push( db.collection( 'users' ).updateOne( { '_id': userID }, { $inc: { 'agora.score.comments': 1 } } ) );
  }

  queryArray.push( db.collection( 'agoragrams' ).insertOne( agoragram ) );
  await Promise.all( queryArray );

  return { 'error': false };
};

// Remove an agoragram
module.exports.antiAgorize = async function ( userID, agoragramID ) {
  userID = ObjectID( userID );
  agoragramID = ObjectID( agoragramID );
  // Unsets (deletes) all identifying fields apart from title and updates the modified field
  const unsetAgoragram = {};
  const setAgoragram = {};

  unsetAgoragram[ 'author' ] = true;
  unsetAgoragram[ 'display' ] = true;
  unsetAgoragram[ 'body' ] = true;

  setAgoragram[ 'modified' ] = new Date();
  setAgoragram[ 'deleted' ] = true;
  const updated = await db.collection( 'agoragrams' ).updateOne( {
    '_id': agoragramID,
    'author': userID
  }, {
    '$set': setAgoragram,
    '$unset': unsetAgoragram
  } );

  if ( updated.result.nModified ) return { 'error': false };
  else return { 'error': 'unauthorised, agoragram does not exist, or agoragram already deleted', 'fields': [ 'userID', 'agoragramID' ], 'return': { userID, agoragramID } };
};

// Edit an agoragram
module.exports.metaAgorize = async function ( userID, agoragramID, body ) {
  userID = ObjectID( userID );
  agoragramID = ObjectID( agoragramID );
  // Sets the new comments body and add that it has been modified
  const setAgoragram = {};
  setAgoragram[ 'body' ] = body;
  setAgoragram[ 'modified' ] = new Date();

  const updated = await db.collection( 'agoragrams' ).updateOne( {
    '_id': agoragramID,
    'author': userID,
    'type': { '$in': [ 'text', 'question', 'comment' ] },
  }, {
    '$set': setAgoragram
  } );

  if ( updated.result.nModified ) return { 'error': false };
  else return { 'error': 'unauthorised, an agoragram does not exist, or an agoragram is uneditable', 'fields': [ 'userID', 'agoragramID' ], 'return': { userID, agoragramID } };
};

// Like an an agoragram
module.exports.asteri = async function ( userID, starID ) {
  userID = ObjectID( userID );
  starID = ObjectID( starID );
  // Checks if the user has already rated this an agoragram, if it hasn't the query will result in undefined.
  // Also retrieves if the an agoragram even exists

  let queryArray = [];

  const starredAgoragram = await db.collection( 'agoragrams' ).findOne( { '_id': starID } );

  // Checks if exists
  if ( !starredAgoragram._id ) return { 'error': 'agoragram does not exist', 'fields': [ 'starID' ], 'return': { starID } };
  let starredByUser = await db.collection( 'users' ).updateOne( { '_id': userID }, { $addToSet: { 'agora.starredAgoragrams': starID } } );
  starredByUser = !( starredByUser.result.nModified );

  // Checks if the user has rated the an agoragram or not
  let star = 0;
  if ( starredByUser ) {
    // If the user has starred the an agoragram, i.e. unstar it.
    queryArray.push( db.collection( 'users' ).updateOne( { '_id': userID }, { $pull: { 'agora.starredAgoragrams': starID } } ) );
    star = -1;
  } else star = 1;

  if ( starredAgoragram.author ) {
    const authorID = starredAgoragram.author;
    queryArray.push( db.collection( 'users' ).updateOne( { '_id': authorID }, { $inc: { 'agora.score.stars': star } } ) );
  }

  // Gets the replyToID (only comments have this field) and increments it's stars at the same time. Database god.
  queryArray.push( db.collection( 'agoragrams' ).findOneAndUpdate( {
    '_id': starID
  }, {
    $inc: { 'stars': star }
  }, {
    'projection': { '_id': 0, 'replyTo': 1 }
  } ) );

  let starredanAgoragram = ( await Promise.all( queryArray ) )[ queryArray.length - 1 ];
  queryArray = [];

  // Checks if it is a comment. Then updates that comments parents children array then sorts it (only if the starred comment's stars is larger than the next one).
  // This process is done to accelerate front-end sorted tree building.
  if ( starredanAgoragram.value && starredanAgoragram.value.replyTo ) {
    const replyToID = ObjectID( starredanAgoragram.value.replyTo );
    // Gets all the starred comments siblings and increments the starred comments stars in the parents child array. database god.
    let children = ( db.collection( 'agoragrams' ).findOneAndUpdate( {
      '_id': replyToID,
      'children._id': starID
    }, {
      '$inc': { 'children.$.stars': star }
    }, {
      'projection': { '_id': 0, 'children': 1 },
      'returnOriginal': false
    } ) ).value.children;

    // Fetches the index of starred comment in sibling array
    const startAgoragramIndex = children.findIndex( function ( child ) {
      return child[ '_id' ] === replyToID;
    } );

    // Change if statement to a try/catch statement? The following code will only throw an error if index is out of range. If it catches the error just ignore it. Faster? More elegant?
    // ( startAgoragramIndex !== 0 && star !== 1 ) makes sure that the index will not < 0
    // ( startAgoragramIndex !== ( children.length - 1 ) && star !== -1 ) makes sure that the index will not be out of range.
    // If it is the most starred comment, and gets starred, we do not need to check if it is the most starred comment again
    // Same but opposite if it is the least starred comment and gets unstarred
    if ( ( startAgoragramIndex !== 0 && star !== 1 ) || ( startAgoragramIndex !== ( children.length - 1 ) && star !== -1 ) ) {
      // Fetches the rival comments index, i.e. the next sibling comment with more starss
      const startAgoragramRivalIndex = startAgoragramIndex - star;

      // Switches place with the two rival comments if the starred comment has more star
      if ( children[ startAgoragramIndex ].stars > children[ startAgoragramRivalIndex ].stars ) {
        let tmp = children[ startAgoragramIndex ];
        children[ startAgoragramIndex ] = children[ startAgoragramRivalIndex ];
        children[ startAgoragramRivalIndex ] = tmp;

        await db.collection( 'agoragrams' ).updateOne( { '_id': replyToID }, { '$set': { 'children': children } } );
      }
    }
  }
  // return if it starred or unstarred the agoragram
  const action = star === 1 ? 'starred' : 'unstarred';
  return { 'error': false, action };
};

// Get agoragrams
module.exports.getAgoragrams = async function ( hexSecondsAfter, hexSecondsBefore, sort, hypagora ) {
  const objectIDAfter = ObjectID( hexSecondsAfter + '0000000000000000' );
  const objectIDBefore = ObjectID( hexSecondsBefore + '0000000000000000' );

  // only get agoragrams from specific hypagora or all
  let getAgoragramFilter = { '_id': { '$gte': objectIDAfter, '$lte': objectIDBefore } };
  if ( hypagora !== 'general' ) getAgoragramFilter[ 'hypagora' ] = ObjectID( hypagora );
  getAgoragramFilter[ 'type' ] = { '$in': [ 'text', 'link', 'question' ] };
  getAgoragramFilter[ 'deleted' ] = false;

  if ( sort === 'new' ) return await db.collection( 'agoragrams' ).find( getAgoragramFilter, { projection: { 'reports': 0 } } ).limit( 10 ).sort( { '_id': -1 } ).toArray();
  else if ( sort === 'top' ) return await db.collection( 'agoragrams' ).find( getAgoragramFilter, { projection: { 'reports': 0 } } ).sort( { 'rating': -1 } ).limit( 10 ).toArray();
  else return null;
};

// report user or agoragram
module.exports.report = async function ( id, reason, place ) {
  id = ObjectID( id );
  const insert = { 'type': 'report', 'where': place, 'message': reason, };

  if ( place === 'agoragram' ) {
    const exists = ( await db.collection( 'agoragrams' ).findOneAndUpdate( { '_id': id }, { $push: { 'reports': insert.message } }, { projection: { '_id': 1 } } ) ).value;
    if ( !exists ) return { 'error': 'agoragram does not exist', 'fields': [ 'id' ], 'return': { id } };
    insert[ 'agoragramID' ] = id;
  } else if ( place === 'user' ) {
    const exists = ( await db.collection( 'users' ).findOneAndUpdate( { '_id': id }, { $push: { 'reports': insert.message } }, { projection: { '_id': 1 } } ) ).value;
    if ( !exists ) return { 'error': 'user does not exist', 'fields': [ 'id' ], 'return': { id } };
    insert[ 'userID' ] = id;
  }

  db.collection( 'notifications' ).insertOne( insert );
  return { 'error': false };
};


// Get a single agoragram by objectID
module.exports.getAgoragramByID = async function ( agoragramID ) {
  agoragramID = ObjectID( agoragramID );
  return await db.collection( 'agoragrams' ).find( { '$or': [ { '_id': agoragramID }, { 'post': agoragramID } ] }, { projection: { 'reports': 0 } } ).toArray();
};

// Get single agoragram by shortID
module.exports.getAgoragramByShortID = async function ( shortID ) {
  return await db.collection( 'agoragrams' ).find( { '$or': [ { 'shortID': shortID }, { 'post.shortID': shortID } ] }, { projection: { 'reports': 0 } } ).toArray();
};
// Check if starred
module.exports.checkStarredAgoragrams = async function ( userID, starredList ) {
  userID = ObjectID( userID );
  starredList = starredList.map( id => ObjectID( id ) );

  const userStarredList = await db.collection( 'users' ).aggregate( [
    { $match: { '_id': userID } },
    {
      $project: {
        'userStarredAgoragrams': {
          $filter: {
            input: '$agora.starredAgoragrams',
            as: 'agoragram',
            cond: { $in: [ '$$agoragram', starredList ] }
          }
        },
        _id: 0
      }
    }
  ] ).toArray();

  return userStarredList.userStarredAgoragrams;
};