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

			return fetch('/api/register', {
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
					dispatch(Login.responseRegister('error'))
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
			dispatch(Log.savePayload(username, 'POST /api/register_check_username'))

			dispatch(Register.requestCheckUsername(Date.now()))

			return fetch('/api/register_check_username', {
					method: 'POST',
					body: JSON.stringify(username),
					headers: {"Content-Type": "application/json"},
				})
				.then(response => response.json())
				.then(response => {
					// let fakeResponse = username === 'Nautman' || username === 'Zigolox' || username.length < 3 || username.length > 24 ? false : true
					dispatch(Log.saveResult(response))
					dispatch(Register.responseCheckUsername(response))
					return response
				})
				.catch(error => {
					dispatch(Log.saveResult(error))
					dispatch(Login.responseCheckUsername('error'))
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
			dispatch(Log.savePayload(email, 'POST /api/register_check_email'))

			dispatch(Register.requestCheckEmail(Date.now()))

			return fetch('/api/register_check_email', {
					method: 'POST',
					body: JSON.stringify(email),
					headers: {"Content-Type": "application/json"},
				})
				.then(response => response.json())
				.then(response => {
					// let fakeResponse = true
					dispatch(Log.saveResult(response))
					dispatch(Register.responseCheckEmail(response))
					return response
				})
				.catch(error => {
					dispatch(Log.saveResult(error))
					dispatch(Login.responseCheckEmail('error'))
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


export const Instances = {

	// selectKey

	createInstance(config) {
		return dispatch => {

			dispatch(Log.savePayload(config, 'POST /api/create-instance'))

			return fetch(`https://www.reddit.com/r/frontend.json`)
				.then((result) => {
					dispatch(Log.saveResult(config))
					dispatch(Instances.receiveInstanceCreation(config))
				})
		}
	},
	receiveInstanceCreation: (instance) => ({
		type: 'RECEIVE_INSTANCE_CREATION',
		instance,
		receivedAt: Date.now()
	}),

	requestInstanceData(instanceName) {
		return dispatch => {
			return fetch(`https://www.reddit.com/r/frontend.json`)
				.then((instance) => {
					dispatch(Instances.receiveInstanceData(instance))
				})
		}
	},
	receiveInstanceData: (instance) => ({
		type: 'RECEIVE_INSTANCE_DATA',
		instance,
		receivedAt: Date.now()
	}),

	changeInstanceConfig(config) {
		return dispatch => {
			return fetch(`https://www.reddit.com/r/frontend.json`)
				.then((newConfig) => {
					dispatch(Instances.receiveInstanceConfigChange(newConfig))
				})
		}
	},
	receiveInstanceConfigChange: (config) => ({
		type: 'RECEIVE_INSTANCE_CONFIG_CHANGE',
		config
	}),

	addCalendarInfo(info) {
		return dispatch => {
			return fetch(`https://www.reddit.com/r/frontend.json`)
				.then((calendarInfo) => {
					dispatch(Instances.receiveCalendarInfoAdded(calendarInfo))
				})
		}
	},
	receiveCalendarInfoAdded: calendarInfo => ({
		type: 'RECEIVE_CALENDAR_INFO_ADDED',
		calendarInfo
	}),

	addPlayer(player) {
		return dispatch => {
			return fetch(`https://www.reddit.com/r/frontend.json`)
				.then((player) => {
					dispatch(Instances.receivePlayerAdded(player))
				})
		}
	},
	receivePlayerAdded: player => ({
		type: 'RECEIVE_PLAYER_ADDED',
		player
	}),

	changePlayerInfo(player) {
		return dispatch => {
			return fetch(`https://www.reddit.com/r/frontend.json`)
				.then((player) => {
					dispatch(Instances.receivePlayerInfoChanged(player))
				})
		}
	},
	receivePlayerInfoChanged: player => ({
		type: 'RECEIVE_PLAYER_INFO_CHANGED',
		player
	}),

	startGame(instance) {
		return dispatch => {
			return fetch(`https://www.reddit.com/r/frontend.json`)
				.then((instance) => {
					dispatch(Instances.receiveStartGame(instance))
				})
		}
	},
	receiveStartGame: instance => ({
		type: 'RECEIVE_GAME_STARTED',
		instance
	}),

	killPlayerFromGame(id) {
		return dispatch => {
			return fetch(`https://www.reddit.com/r/frontend.json`)
				.then((id) => {
					dispatch(Instances.receiveKillPlayerFromGame(id))
				})
		}
	},
	receiveKillPlayerFromGame: (id) => ({
		type: 'RECEIVE_KILL_PLAYER_FROM_GAME',
		id
	}),

	removePlayerFromGame(id) {
		return dispatch => {
			return fetch(`https://www.reddit.com/r/frontend.json`)
				.then((id) => {
					dispatch(Instances.receiveRemovePlayerFromGame(id))
				})
		}
	},
	receiveRemovePlayerFromGame: id => ({
		type: 'RECEIVE_REMOVE_PLAYER_FROM_GAME',
		id
	})

}

export const Account = {

	CreateAdminAccount(credentials) {
		return dispatch => {
			return fetch(`https://www.reddit.com/r/frontend.json`)
				.then((credentials) => {
					dispatch(Account.receiveAdminAccountCreated(credentials))
				})
		}
	},
	receiveAdminAccountCreated: credentials => ({
		type: 'RECEIVE_ADMIN_ACCOUNT_CREATED',
		credentials
	}),

	// CreateAdminAccount(info) {
	// 	return dispatch => {
	// 		return fetch(`https://www.reddit.com/r/frontend.json`)
	// 			.then((credentials) => {
	// 				dispatch(Account.receivePlayerAccountCreated(credentials))
	// 			})
	// 	}
	// },
	receivePlayerAccountCreated: credentials => ({
		type: 'RECEIVE_PLAYER_ACCOUNT_CREATED',
		credentials
	}),

	login(credentials) {
		return dispatch => {
			return fetch(`https://www.reddit.com/r/frontend.json`)
				.then((credentials) => {
					dispatch(Account.receiveLoggedIn(credentials))
				})
		}
	},
	receiveLoggedIn: credentials => ({
		type: 'RECEIVE_LOGGED_IN',
		credentials
	})

}

export const Gameplay = {

	requestGameData(credentials) {
		return dispatch => {
			return fetch(`https://www.reddit.com/r/frontend.json`)
				.then((data) => {
					dispatch(Gameplay.receiveGameData(data))
				})
		}
	},
	receiveGameData: data => ({
		type: 'RECEIVE_GAME_DATA',
		data
	}),

	killPlayer(victimId) {
		return dispatch => {
			return fetch(`https://www.reddit.com/r/frontend.json`)
				.then((newGameData) => {
					dispatch(Gameplay.receiveKilling(newGameData))
				})
		}
	},
	receiveKilling: newGameData => ({
		type: 'RECEIVE_KILLING',
		newGameData
	}),

	reportPlayer(credentials) {
		return dispatch => {
			return fetch(`https://www.reddit.com/r/frontend.json`)
				.then((result) => {
					dispatch(Gameplay.reportPlayer(result))
				})
		}
	},
	receiveReportation: (result) => ({
		type: 'RECEIVE_REPORTATION',
		result
	})

}
