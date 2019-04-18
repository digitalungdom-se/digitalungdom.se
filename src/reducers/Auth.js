export default (state = {}, action) => {
	switch(action.type) {
		case 'RECEIVE_AUTH':
			if(action.response.reason === "Not authorised") return {
				...action.response,
				authTime: action.response._responseTime
			}
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
			}
		case 'REQUEST_LOGIN':
			return {
				...state,
				loggingIn: true,
			}
		case 'RESPONSE_LOGIN':
			return {
				...state,
				loggingIn: false,
				loginResponse: action.response.type,
				reason: action.response.reason
			}
		case 'RESPONSE_LOGOUT':
			return {
				authed: action.type === 'fail'
			}
		default:
			return state
	}
}
