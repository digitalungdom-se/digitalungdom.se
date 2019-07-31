export default (state = {
	users: {}
}, action) => {
	let users
	switch(action.type) {
		case 'REQUEST_GET_USER':
			users = {}
			action.request.userArray.forEach(id => users[id] = false)
			return {
				...state,
				users: {
					...state.users,
					...users
				}
			}
		case "RESPONSE_GET_USER":
			users = {}
			if(action._url === "/api/auth") {
				let id = action.response.info._id
				let user = {details: action.response.info}
				users = {
					[id]: user
				}
			} else {
				if(action.response.errors[0] && action.response.errors[0].reason === "no such users") {
					action.response.errors[0].return.userArray.forEach(id => users[id] = {username: "deleted"})
				}
				else action.response.users.forEach(user => users[user._id] = user)
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
