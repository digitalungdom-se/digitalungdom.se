const Auth = (state = {}, action) => {
	switch(action.type) {
		case 'LOGIN':
			return {
				...state,
				...action.credentials
			}
		default:
			return state
	}
}

export default Auth
