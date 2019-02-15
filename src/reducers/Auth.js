const Auth = (state = {}, action) => {
	switch(action.type) {
		case 'RECEIVE_AUTH':
			return {
				...state,
				...action.response
			}
		default:
			return state
	}
}

export default Auth
