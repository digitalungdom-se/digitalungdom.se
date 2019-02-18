const Auth = (state = {}, action) => {
	switch(action.type) {
		case 'RECEIVE_AUTH':
			return {
				...state,
				...action.response,
				authTime: action.response._responseTime
			}
		default:
			return state
	}
}

export default Auth
