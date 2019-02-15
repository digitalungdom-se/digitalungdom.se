const Login = (state = {}, action) => {
	switch(action.type) {
		case 'REQUEST_LOGIN':
			return {
				...state,
				...action.requestedAt,
				loggingIn: true
			}
		case 'RESPONSE_LOGIN':
			return {
				...state,
				loggingIn: false,
				loggedIn: action.response
			}
		default:
			return state
	}
}

export default Login
