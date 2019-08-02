import createAsyncFunction from './createAsyncFunction.js'
const esc = encodeURIComponent;
const query = params => Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&')

const Users = {
  ...createAsyncFunction( 'get_user', { method: 'GET', route: '/api/get_user' }, [] ),
}

export function getUser(userArray, type) {
  return {
    // Types of actions to emit before and after
    types: ['GET_USER_REQUEST', 'GET_USER_SUCCESS', 'GET_USER_FAILURE'],
    // Check the cache (optional):
    // Perform the fetching:
    callAPI: () => fetch("/api/get_user?" + query({ type, userArray }), {
    	headers: {"Content-Type": "application/json"},
    	method: "GET"
    }).then(res => res.json()),
    // Arguments to inject in begin/end actions
    payload: { userArray, userType: type, url: "/api/get_user" }
  }
}

export default Users
