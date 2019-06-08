import { flatTree } from 'utils'

export default (state = {
	viewingComments: false,
	comments: {},
	fullIds: {},
	users: [],
	agoragrams: {},
	posts: {
		total: 0,
		routes: {},
		fetchedSeveral: false,
	},
	hypagora_infos: {}
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
				const agoragrams = {}
				const users = []
				const list = action.response.agoragrams.map(agoragram => {
					agoragrams[agoragram._id] = {
						...agoragram,
						users: [agoragram.author]
					}
					users.push(agoragram.author)
					return agoragram._id
				})
				return {
					...state,
					...action._responseTime,
					users: [...state.users, ...users],
					fetchingAgoragrams: false,
					agoragrams: {
						...state.agoragrams,
						...agoragrams
					},
					posts: {
						...state.posts,
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

				const {tree, users} = flatTree(action.response.agoragram)

				// const comments = buildTree(action.response.agoragram[0]._id, tree)

				return {
					...state,
					fullIds: {
						...state.fullIds,
						[action.response.agoragram[0].shortID]: action.response.agoragram[0]._id
					},
					// comments: tree,
					users: [...state.users, ...users],
					agoragrams: {
						...state.agoragrams,
						...tree,
						[action.response.agoragram[0]._id]: {
							users,
							...action.response.agoragram[0]
						},
					},
					posts: {
						...state.posts,
						total: state.posts.total + 1,
						[action.response.agoragram[0]._id]: {
							users,
							...action.response.agoragram[0]
						}
					}
				}
			}
			else return state
		case 'REQUEST_ASTERI':
			return state
		case 'RESPONSE_ASTERI':
			if(action.response.type === "success") {
				let agoragram = state.agoragrams[action.response.agoragramID]
				if(action.response.action === "unstarred") agoragram.stars--;
				else agoragram.stars++;
				// console.log(action.response.agoragramID, agoragram)
				return {
					...state,
					agoragrams: {
						...state.agoragrams,
						[action.response.agoragramID]: agoragram
					}
				}
			}
			return state
		case 'VIEW_COMMENTS':
			return {
				...state,
				viewingComments: true
			}
		default:
			return state
	}
}
