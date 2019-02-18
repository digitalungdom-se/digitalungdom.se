import createAsyncFunction from './createAsyncFunction.js'

export const Auth = {
	receiveAuth: (response) => ({
		type: 'RECEIVE_AUTH',
		response,
		receivedAt: Date.now()
	})
}

const fakeResponse = 0 ? {
	  "type": "success",
	  "name": "Douglas Bengtsson",
	  "username": "Nautman"
		} : null

export const Login = {
	...createAsyncFunction('login', {method: 'POST', route: '/api/login'}, [Auth.receiveAuth], fakeResponse),
}

export const Register = {
	...createAsyncFunction('register', {method: 'POST', route: '/api/register'}, [Auth.receiveAuth], fakeResponse),
	...createAsyncFunction('check_email', {method: 'POST', route: '/api/register_check_email'}, []),
	...createAsyncFunction('check_username', {method: 'POST', route: '/api/register_check_username'}, []),
}

export const Users = {
	...createAsyncFunction('get_user', {method: 'POST', route: '/api/get_user'}, []),
}

// REGISTER
// 	REGISTER_ACCOUNT
// 	REGISTER_CHECK_USERNAME
// 	REGISTER_CHECK_EMAIL
// LOGIN
// 	LOGIN
// PROFILE
// 	GET_USER
// 	EDIT_USER_DETAILS
// 	GET_USER_POSTS
// 	GET_USER_COMMENTS
// BLOG
// 	GET_POSTS
// 	POST_BLOG
// 	REMOVE_POST
// 	COMMENT
// 	LIKE
// AUTH
// 	I_AM_AUTH