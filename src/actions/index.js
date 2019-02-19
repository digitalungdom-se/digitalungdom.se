import createAsyncFunction from './createAsyncFunction.js'

export let Auth = {
	receiveAuth: (response) => ({
		type: 'RECEIVE_AUTH',
		response,
		receivedAt: Date.now()
	})
}

Auth = {
	...Auth,
	...createAsyncFunction('auth', {method: 'POST', route: '/api/auth'}, [Auth.receiveAuth])
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
