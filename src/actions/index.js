export const Log = {
	savePayload: (payload, route) => ({
		type: 'SAVE_PAYLOAD',
		payload,
		route
	}),
	saveResult: result => ({
		type: 'SAVE_RESULT',
		result
	})
}

export const Login = {
	login (credentials) {
		return dispatch => {
			dispatch(Log.savePayload(credentials, 'POST /api/login'))

			dispatch(Login.requestLogin(Date.now()))

			return fetch('/api/login', {
					method: 'POST',
					body: JSON.stringify(credentials),
					headers: {"Content-Type": "application/json"},
				})
				.then(response => response.json())
				.then(response => {
					// let fakeResponse = {
					// 	"type": "fail",
					// 	"name": "Douglas Bengtsson",
					//   "username": "Nautman"
					// }
					const { type, ...jsonResponse } = response
					dispatch(Log.saveResult(response))
					dispatch(Auth.receiveAuth({...jsonResponse, authTime: Date.now()}))
					dispatch(Login.responseLogin(type))
				})
				.catch(error => {
					dispatch(Log.saveResult(error))
					dispatch(Login.responseLogin('error'))
				})
		}
	},
	requestLogin: time => ({
		type: 'REQUEST_LOGIN',
		requestedAt: time
	}),
	responseLogin: response => ({
		type: 'RESPONSE_LOGIN',
		response
	})
}

export const Register = {
	register (credentials) {
		return dispatch => {
			dispatch(Log.savePayload(credentials, 'POST /api/register'))

			dispatch(Register.requestRegister(Date.now()))

			return fetch('/register', {
					method: 'POST',
					body: JSON.stringify(credentials),
					headers: {"Content-Type": "application/json"},
				})
				.then(response => response.json())
				.then(response => {
					// let fakeResponse = {
					// 	"type": "success",
					// 	"name": "Douglas Bengtsson",
					//   "username": "Nautman"
					// }
					const { type, ...jsonResponse } = response
					dispatch(Log.saveResult(response))
					dispatch(Auth.receiveAuth({...jsonResponse, authTime: Date.now()}))
					dispatch(Register.responseRegister(type))
				})
				.catch(error => {
					dispatch(Log.saveResult(error))
					dispatch(Register.responseRegister('error'))
				})
		}
	},
	requestRegister: time => ({
		type: 'REQUEST_REGISTER',
		requestedAt: time
	}),
	responseRegister: response => ({
		type: 'RESPONSE_REGISTER',
		response
	}),
	checkUsername (username) {
		return dispatch => {
			dispatch(Log.savePayload({username}, 'POST /api/register_check_username'))

			dispatch(Register.requestCheckUsername(Date.now()))

			return fetch('/api/register_check_username', {
					method: 'POST',
					body: JSON.stringify({username}),
					headers: {"Content-Type": "application/json"},
				})
				.then(response => response.json())
				.then(response => {
					// let fakeResponse = username === 'Nautman' || username === 'Zigolox' || username.length < 3 || username.length > 24 ? false : true
					dispatch(Log.saveResult(response))
					dispatch(Register.responseCheckUsername(response.username))
					return response.username
				})
				.catch(error => {
					dispatch(Log.saveResult(error))
					dispatch(Register.responseCheckUsername('error'))
				})
		}
	},
	requestCheckUsername: time => ({
		type: 'REQUEST_CHECK_USERNAME',
		requestAt: time
	}),
	responseCheckUsername: response => ({
		type: 'RESPONSE_CHECK_USERNAME',
		response
	}),
	checkEmail (email) {
		return dispatch => {
			console.log(JSON.stringify({email}))
			dispatch(Log.savePayload({email}, 'POST /api/register_check_email'))

			dispatch(Register.requestCheckEmail(Date.now()))

			return fetch('/api/register_check_email', {
					method: 'POST',
					body: JSON.stringify({email}),
					headers: {"Content-Type": "application/json"},
				})
				.then(response => response.json())
				.then(response => {
					// let fakeResponse = true
					dispatch(Log.saveResult(response))
					dispatch(Register.responseCheckEmail(response.email))
					return response.email
				})
				.catch(error => {
					dispatch(Log.saveResult(error))
					dispatch(Register.responseCheckEmail('error'))
				})
		}
	},
	requestCheckEmail: time => ({
		type: 'REQUEST_CHECK_EMAIL',
		requestAt: time
	}),
	responseCheckEmail: response => ({
		type: 'RESPONSE_CHECK_EMAIL',
		response
	})
}

export const Auth = {
	receiveAuth: (response) => ({
		type: 'RECEIVE_AUTH',
		response,
		receivedAt: Date.now()
	})
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