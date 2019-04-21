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
			let users = {}
			if(action._url === "/api/auth") {
				let id = action.response.info._id
				let user = {details: action.response.info}
				users = {
					id: user
				}
			} else {
				action.response.user.forEach(user => users[user._id] = user)
			}
			return {
				...state,
				users: {
					...state.users,
					...users
				}
			}
		default:
			return state
	}
}
