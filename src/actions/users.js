import createAsyncFunction from './createAsyncFunction.js'
import { timeToHex } from 'utils/time'

const esc = encodeURIComponent;
const query = params => Object.keys( params )
  .map( k => esc( k ) + '=' + esc( params[ k ] ) )
  .join( '&' )

const Users = {
  ...createAsyncFunction( 'get_user', { method: 'GET', route: '/api/agora/get/user' }, [] ),
  ...createAsyncFunction( 'get_user', { method: 'GET', route: '/api/agora/get/profile_picture' }, [] ),
}

export function getUser( {username, dateAfter, dateBefore, sort, hypagora,id} ) {
  if(!sort) sort = "new";
  if(!hypagora) hypagora = "";
  if(!dateBefore) dateBefore = timeToHex(Date.now()).hex
  if(!dateAfter) dateAfter = timeToHex(0).hex
  return {
    // Types of actions to emit before and after
    types: [ 'GET_USER_REQUEST', 'GET_USER_SUCCESS', 'GET_USER_FAILURE' ],
    // Check the cache (optional):
    // Perform the fetching:
    callAPI: () => fetch( "/api/agora/get/user?" + query( { username, dateAfter, dateBefore, sort, hypagora } ) ),
    // Arguments to inject in begin/end actions
    payload: { username,dateAfter,dateBefore,sort,hypagora, url: "/api/agora/get/user" }
  }
}

export function getProfilePictureByID( id, size ) {
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

export default Users
