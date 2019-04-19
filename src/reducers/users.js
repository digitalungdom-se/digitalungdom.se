export default (state = {
	users: {}
}, action) => {
	switch(action.type) {
		case 'REQUEST_GET_USER':
			return {
				...state,
				users: {
					...state.users,
					[action.request.userId]: false
				}
			}
		case "RESPONSE_GET_USER":
			let id, user
			if(action._url === "/api/auth") {
				id = action.response.info._id
				user = {details: action.response.info}
			} else {
				id = action.response.user._id
				user = action.response.user
			}
			return {
				...state,
				users: {
					...state.users,
					[id]: user
				}
			}
		default:
			return state
	}
}
