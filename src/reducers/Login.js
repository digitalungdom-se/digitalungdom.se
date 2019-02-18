const Login = (state = {}, action) => {
	switch(action.type) {
		case 'REQUEST_LOGIN':
			return {
				...state,
				...action._requestTime,
				loggingIn: true
			}
		case 'RESPONSE_LOGIN':
			return {
				...state,
				loggingIn: false,
				loggedIn: action.response.type
			}
		default:
			return state
	}
}

export default Login
