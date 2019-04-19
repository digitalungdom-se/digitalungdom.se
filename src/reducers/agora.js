export default (state = {
	viewingComments: false,
	comments: {},
	posts: {
		total: 0,
		routes: {},
		fetchedSeveral: false,
		fullIds: {}
	}
}, action) => {
	switch(action.type) {
		case 'REQUEST_GET_AGORAGRAMS':
			return {
				...state,
				...action._requestTime,
				posts: {
					...state.posts,
					[action._url]: false,
					fetchedSeveral: true
				},
				fetchingAgoragrams: true
			}
		case 'RESPONSE_GET_AGORAGRAMS':
			if(action.response.type === "success") {
				const posts = {}
				const list = action.response.posts.map(post => {
					posts[post._id] = post
					return post._id
				})
				return {
					...state,
					...action._responseTime,
					fetchingAgoragrams: false,
					posts: {
						...state.posts,
						...posts,
						fetchedSeveral: true,
						total: state.posts.total + list.length,
						routes: {
							...state.posts.routes,
							[action._url]: list,
						}
					}
					// agoragrams: []
				}
			} else return state
		case 'RESPONSE_GET_AGORAGRAM':
		// console.log({
		// 		...state,
		// 		posts: {
		// 			...state.posts,
		// 			[action.response.post[0]._id]: {
		// 				...action.response.post[0],
		// 				comments: action.response.post.slice(0, 1)
		// 			}
		// 		}
		// 	})
		// console.log({
		// 	[action.response.post[0]._id]: {
		// 		...action.response.post[0],
		// 		comments: action.response.post.slice(0, 1)
		// 	}
		// })
		if(action.response.type === "success") return {
			...state,
			posts: {
				...state.posts,
				total: state.posts.total + 1,
				[action.response.post[0]._id]: {
					...action.response.post[0],
					comments: action.response.post.slice(1, action.response.post.length),
				},
				fullIds: {
					...state.posts.fullIds,
					[action.response.post[0].id]: action.response.post[0]._id
				}
			}
		}
		else return state
			// return {
			// 	...state,
			// 	posts: {
			// 		...state.posts,
			// 	}
			// }
		case 'VIEW_COMMENTS':
			return {
				...state,
				viewingComments: true
			}
		default:
			return state
	}
}
