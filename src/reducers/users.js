export default (state = {
	users: {}
}, action) => {
	let users
	switch(action.type) {
		case 'REQUEST_GET_USER':
		// console.log('HELLO')
			users = {}
			action.request.userArray.forEach(id => users[id] = false)
			return {
				...state,
				users: {
					...state.users,
					...users
				}
			}
		case "GET_USER_REQUEST":
			users = {}
			action.userArray.forEach(id => users[id] = false)
			return {
				...state,
				users: {
					...state.users,
					...users
				}
			}
			return state
		case "GET_USER_SUCCESS":
			const users = {}
			action.response.users.forEach(user => users[user._id] = user)
			return {
				...state,
				users: {
					...state.users,
					...users
				}
			}
			// users = {}
			// if(action.url === "/api/auth") {
			// 	let id = action.response.info._id
			// 	let user = {details: action.response.info}
			// 	users = {
			// 		[id]: user
			// 	}
			// } else {
			// 	if(action.response.errors) {
			// 		if(action.response.errors[0] && action.response.errors[0].reason === "no such users") {
			// 			action.response.errors[0].return.userArray.forEach(id => users[id] = {details: null})
			// 		}
			// 	}
			// 	else {
			// 		let forgottenUsers = action.userArray
			// 		action.response.users.forEach(user => {
			// 			users[user._id] = user
			// 			let index = forgottenUsers.indexOf(user._id)
			// 			forgottenUsers.splice(index, 1)
			// 		})
			// 		forgottenUsers.forEach(id => users[id] = {details: null})
			// 	}
			// }
			// return {
			// 	...state,
			// 	users: {
			// 		...state.users,
			// 		...users
			// 	}
			// }
			// return state
		case "GET_USER_ERROR":
			console.log(action)
			return state
		case "RESPONSE_GET_USER":
			users = {}
			if(action._url === "/api/auth") {
				let id = action.response.info._id
				let user = {details: action.response.info}
				users = {
					[id]: user
				}
			} else {
				if(action.response.errors) {
					if(action.response.errors[0] && action.response.errors[0].reason === "no such users") {
						action.response.errors[0].return.userArray.forEach(id => users[id] = {username: "deleted"})
					}
				}
				else {
					console.log(action)
					action.response.users.forEach(user => users[user._id] = user)
				}
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
