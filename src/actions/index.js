import createAsyncFunction from './createAsyncFunction.js'

export const Auth = {
	receiveAuth: (response) => ({
		type: 'RECEIVE_AUTH',
		response,
		receivedAt: Date.now()
	})
}

export const Login = {
	...createAsyncFunction('login', {method: 'POST', route: '/api/login'}, [Auth.receiveAuth],
		{
	  "type": "success",
	  "name": "Douglas Bengtsson",
	  "username": "Nautman"
		}
	),
}

export const Register = {
	...createAsyncFunction('register', {method: 'POST', route: '/api/login'}, [Auth.receiveAuth],
		{
		  "type": "success",
		  "name": "Douglas Bengtsson",
		  "username": "Nautman"
		}
	),
	...createAsyncFunction('check_email', {method: 'POST', route: '/api/login'}, [],
		{
		  "email": true
		}
	),
	...createAsyncFunction('check_username', {method: 'POST', route: '/api/login'}, [],
		{
		  "username": true
		}
	),
}

export const Users = {
	...createAsyncFunction('get_user', {method: 'POST', route: '/api/get_user'}, [],
		{
	  "type": "success",
	  "name": "Douglas Bengtsson",
	  "username": "Nautman"
		}
	),
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