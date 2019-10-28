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

export function setProfile( form, base64, id, username ) {
  const index = base64.indexOf(',')
  const image = base64.substring(index + 1)
  const imageType = {
    mime: base64.substring("data:".length, index),
    ext: base64.substring(base64.indexOf("/"), index + 1)
  }
  return {
    types: [
      'SET_PROFILE_PICTURE_REQUEST',
      'SET_PROFILE_PICTURE_SUCCESS',
      'SET_PROFILE_PICTURE_FAILURE'
    ],
    callAPI: () =>
      fetch( "api/user/set/profile_picture", {
        method: 'PUT',
        // headers: {
        // //   Accept: 'application/json',
        // //   // 'Content-Type': 'application/json'
        //   // 'Content-Type': "multipart/form-data"
        // },
        body: form
      } ),
    callbacks: [
      () => ({
        type: "GET_PROFILE_PICTURE_SUCCESS",
        response: {
          id,
          username,
          image,
          imageType
        },
        payload: {
          id,
          username
        }
      })
    ],
    payload: { base64 }
  }
}

export function set( form, userID ) {
  return {
    types: [
      'SET_REQUEST',
      'SET_SUCCESS',
      'SET_FAILURE'
    ],
    callAPI: () =>
      fetch( "api/user/set", {
        method: 'put',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
          // 'Content-Type': "multipart/form-data"
        },
        body: JSON.stringify( form )
      } ),
    payload: { ...form, userID }
  }
}

export function getUser( { username, dateAfter, dateBefore, sort, hypagora, id } ) {
  if ( !sort ) sort = "new";
  if ( !hypagora ) hypagora = "";
  if ( !dateBefore ) dateBefore = timeToHex( Date.now() ).hex
  if ( !dateAfter ) dateAfter = timeToHex( 0 ).hex
  return {
    // Types of actions to emit before and after
    types: [ 'GET_USER_REQUEST', 'GET_USER_SUCCESS', 'GET_USER_FAILURE' ],
    // Check the cache (optional):
    shouldCallAPI: state => state.Users.usernames[username] === undefined  || state.Users.agoraList.indexOf(username) === -1,
    // Perform the fetching:
    callAPI: () => fetch( "/api/agora/get/user?" + query( { username, dateAfter, dateBefore, sort, hypagora } ) ),
    callbacks: [
      (response, payload) => (
        {
          type: "GET_AGORAGRAMS_SUCCESS",
          response,
          payload
        }
      )
    ],
    // Arguments to inject in begin/end actions
    payload: { username, dateAfter, dateBefore, sort, hypagora, url: "/api/agora/get/user" }
  }
}

export function deleteUser({ user }){

  return{
    types:[
      'DELETEUSER_REQUEST',
      'DELETEUSER_SUCCESS',
      'DELETEUSER_FAILURE'
    ],
    callAPI: () => fetch( "/api/user/delete", {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        user
      })
    }),
    payload: null
  }
}

export default Users
