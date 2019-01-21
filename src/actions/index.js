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

export const Auth = {
	login: (credentials) => ({
		type: 'LOGIN',
		credentials,
	})
}

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
