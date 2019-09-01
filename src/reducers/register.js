const Register = (state = {}, action) => {
	switch(action.type) {
		case 'CHECK_USERNAME_REQUEST':
			return {
				...state,
				checkingUsername: true
			}
		case 'CHECK_USERNAME_SUCCESS':
			return {
				...state,
				checkingUsername: false,
				usernameAvailable: action.response.username
			}
		case 'CHECK_USERNAME_FAILURE':
			return {
				...state,
				checkingUsername: false,
				usernameAvailable: undefined
			}
		case 'CHECK_EMAIL_REQUEST':
			return {
				...state,
				checkingEmail: true
			}
		case 'CHECK_EMAIL_SUCCESS':
			return {
				...state,
				checkingEmail: false,
				emailAvailable: action.response.email
			}
		case 'CHECK_EMAIL_FAILURE':
			return state
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
