import { flatTree, buildTree } from 'utils'

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
				}
			} else return state
		case 'RESPONSE_GET_AGORAGRAM':
			if(action.response.type === "success") {

				const tree = flatTree(action.response.post)

				const comments = buildTree(action.response.post[0]._id, tree)

				return {
					...state,
					posts: {
						...state.posts,
						total: state.posts.total + 1,
						[action.response.post[0]._id]: comments,
						fullIds: {
							...state.posts.fullIds,
							[action.response.post[0].shortId]: action.response.post[0]._id
						}
					}
				}
			}
			else return state
		case 'VIEW_COMMENTS':
			return {
				...state,
				viewingComments: true
			}
		default:
			return state
	}
}
