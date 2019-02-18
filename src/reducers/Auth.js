const Auth = (state = {}, action) => {
	switch(action.type) {
		case 'RECEIVE_AUTH':
			return {
				...state,
				...action.response,
				authTime: action.response._responseTime
			}
		case 'REQUEST_AUTH':
			return {
				...state,
				...action._requestTime,
				authing: true
			}
		case 'RESPONSE_AUTH':
			return {
				...state,
				authing: false,
				authed: action.response
			}
		default:
			return state
	}
}

export default Auth
