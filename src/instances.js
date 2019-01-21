const Instances = (state = { list: {} }, action ) => {

	switch(action.type) {
		case 'CREATE_INSTANCE':
			return {
				...state,
				creatingInstance: true
			}
		case 'RECEIVE_INSTANCE_CREATION':
			return {
				...state,
				creatingInstance: false,
				list: {
					...state.list,
					[action.instance.name]: {
						...action.instance
					}
				}
			}
		case 'REQUEST_INSTANCE_DATA':
			return {
				...state,
				requestingInstanceData: true
			}
		case 'RECEIVE_INSTANCE_DATA':
			return {
				...state,
				list: {
					...state.list,
					[action.instance.name]: {
						...action.instance
					}
				}
			}
		case 'CHANGE_INSTANCE_CONFIG':
			return {
				...state,
				changingInstanceConfig: true
			}
		case 'RECEIVE_INSTANCE_CONFIG_CHANGED':
			const newConfig = Object.assign({}, state)
			newConfig.list[action.config.name].config = action.config
			newConfig.changingInstanceConfig = false
			return newConfig
		case 'ADD_CALENDAR_INFO':
			return {
				...state,
				changingCalendarInfo: true
			}
		case 'RECEIVE_CALENDAR_INFO_ADDED':
			const newCalendar = Object.assign({}, state)
			newCalendar.list[action.calendarInfo.name].calendarInfo = action.calendarInfo
			newCalendar.changingCalendarInfo = false
			return newCalendar
		case 'ADD_PLAYER':
			return {
				...state,
				addingPlayer: true
			}
		case 'RECEIVE_PLAYER_ADDED':
			let newState = Object.assign({}, state)
			// newState.list
			return newState
		default:
			return state
	}

	// addPlayer
	// receivePlayerAddition

	// changePlayerInfo
	// receivePlayerInfoChanged

	// startGame
	// receiveStartGame

	// killPlayerFromGame
	// receivekillPlayerFromGame

	// removePlayerFromGame

}

export default Instances