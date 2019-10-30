const esc = encodeURIComponent;
const query = params => Object.keys( params )
  .map( k => esc( k ) + '=' + esc( params[ k ] ) )
  .join( '&' )

export function getProfilePicture( id, size ) {
  size = 100;
  let identifier = id.username ? id.username : id.id
  return {
    // Types of actions to emit before and after
    types: [ 'GET_PROFILE_PICTURE_REQUEST', 'GET_PROFILE_PICTURE_SUCCESS', 'GET_PROFILE_PICTURE_FAILURE' ],
    // Check the cache (optional):
    shouldCallAPI: state => state.ProfilePictures[identifier] === undefined,
    // Perform the fetching:
    callAPI: () => fetch( `/api/agora/get/profile_picture?${query( { ...id, size } )}` ),
    // Arguments to inject in begin/end actions
    payload: { ...id, size, url: "/api/agora/get/profile_picture" }
  }
}

// api/ user/ set [["profilePicture"]]
// put request , form-data
/*
body: JSON.stringify( {
  ...info,
  hypagora: "general"
} )
*/

export function getProfilePictureByID( id, size ) {
  size = 100;
  return {
    // Types of actions to emit before and after
    types: [ 'GET_PROFILE_PICTURE_REQUEST', 'GET_PROFILE_PICTURE_SUCCESS', 'GET_PROFILE_PICTURE_FAILURE' ],
    // Check the cache (optional):
    // Perform the fetching:
    callAPI: () => fetch( `/api/agora/get/profile_picture?${query( { id, size } )}` ),
    // Arguments to inject in begin/end actions
    payload: { id, size, url: "/api/agora/get/profile_picture" }
  }
}

export function getProfilePictureByUsername( username, size ) {
  size = 100;
  return {
    // Types of actions to emit before and after
    types: [ 'GET_PROFILE_PICTURE_REQUEST', 'GET_PROFILE_PICTURE_SUCCESS', 'GET_PROFILE_PICTURE_FAILURE' ],
    // Check the cache (optional):
    // Perform the fetching:
    callAPI: () => fetch( `/api/agora/get/profile_picture?${query( { username, size } )}` ),
    // Arguments to inject in begin/end actions
    payload: { username, size, url: "/api/agora/get/profile_picture" }
  }
}
