const Register = (state = {}, action) => {
	switch(action.type) {
		case 'REQUEST_REGISTER':
			return {
				...state,
				...action._requestTime,
				registering: true
			}
		case 'RESPONSE_REGISTER':
			return {
				...state,
				registering: false,
				registered: action.response
			}
		case 'REQUEST_CHECK_USERNAME':
			return {
				...state,
				usernameRequestAt: action._requestTime,
				checkingUsername: true
			}
		case 'RESPONSE_CHECK_USERNAME':
			return {
				...state,
				checkingUsername: false,
				username: action.response
			}
		case 'REQUEST_CHECK_EMAIL':
			return {
				...state,
				checkingEmail: true
			}
		case 'RESPONSE_CHECK_EMAIL':
			return {
				...state,
				checkingEmail: false,
				email: action.response
			}
		default:
			return state
	}
}

export default Register