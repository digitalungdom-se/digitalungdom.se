const Users = (state = {}, action) => {
	switch(action.type) {
		case 'REQUEST_GET_USER':
			return {
				...state,
				...action._requestTime,
				getting_user: action.request.username
			}
		case 'RESPONSE_GET_USER':
			return {
				...state,
				gotUser: action.response.username,
				[action.response.username]: {
					...action.response
				}
			}
		default:
			return state
	}
}

export default Users
