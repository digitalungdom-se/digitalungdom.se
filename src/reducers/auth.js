export default (state = {
	profile: {
		details: {}
	}
}, action) => {
	switch(action.type) {
		case 'AUTH_REQUEST':
			return {
				...state,
				authorizing: true
			}
		case 'AUTH_FAILURE':
			return {
				...state,
				authorizing: false,
				authorized: false,
				profile: {
					details: {}
				}
			}
		case 'AUTH_SUCCESS':
			return {
				...state,
				profile: {
					details: action.response.details
				},
				authorizing: false,
				authorized: true,
			}
		case 'RECEIVE_AUTH':
			if(action.response.type === "fail") return {
				...action.response,
				authTime: action.response._responseTime
			}
			return {
				...state,
				...action.response.details,
				authTime: action.response._responseTime
			}
		case 'LOGIN_REQUEST':
			return {
				...state,
				authorizing: true,
			}
		case 'LOGIN_SUCCESS':
			return {
				...state,
				authorizing: false,
				authorized: true,
				loggingInError: false,
				profile: {
					details: action.response.details
				}
			}
		case 'LOGIN_FAILURE':
			return {
				...state,
				authorizing: false,
				authorized: false,
				loggingInError: action.response.errors[0].msg
			}
		case 'LOGOUT_REQUEST':
			return {
				...state,
				loggingOut: true
			}
		case 'LOGOUT_SUCCESS':
			const { newState, ...profile } = state
			return {
				...newState,
				profile: {
					details: {}
				},
				loggingOut: false,
				authorized: false
			}
		case 'LOGOUT_ERROR':
			return {
				...state,
				loggingOut: false
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
