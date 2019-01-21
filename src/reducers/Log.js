const Log = (state = {}, action) => {
	switch(action.type) {
		case 'SAVE_PAYLOAD':
			return {
				...state,
				payload: {
					...action.payload
				},
				route: action.route
			}
		case 'SAVE_RESULT':
			return {
				...state,
				result: {
					...action.result
				}
			}
		default:
			return state
	}
}

export default Log
