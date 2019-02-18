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
		case 'SAVE_RESPONSE':
			return {
				...state,
				response: {
					...action.response
				}
			}
		default:
			return state
	}
}

export default Log
