export default (state = {
	users: {}
}, action) => {
	switch(action.type) {
		case 'REQUEST_GET_USER':
			console.log(action)
			return state
		case "RESPONSE_GET_USER":
			let id, user
			if(action._url === "/api/auth") {
				id = action.response.info.id
				user = action.response.info
			} else {
				console.log(action)
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
