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
	hypagora_infos: {
		"general": {
			background: "transparent"
		}
	},
	starredAgoragrams: [],
	availableHypagoras: ["general"],
	agorizing: [],
	agorized: []
}, action) => {
	switch(action.type) {
		case 'GET_AGORAGRAMS_REQUEST':
			return {
				...state,
				...action._requestTime,
				posts: {
					...state.posts,
					[action.query]: false,
					fetchedSeveral: true
				},
				fetchingAgoragrams: true,
				query: action.query
			}
		case 'GET_AGORAGRAMS_SUCCESS':
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
							[action.query]: list,
						}
					},
					starredAgoragrams: state.starredAgoragrams.concat(action.response.starredAgoragrams)
					// starredAgoragrams: [
					// 	...state.starredAgoragrams,
					// 	...action.response.starredAgoragrams
					// ]
				}
			} else return state
		case 'GET_AGORAGRAM_SUCCESS':
			const { tree } = flatTree(action.response.agoragrams)
			return {
				...state,
				fullIds: {
					...state.fullIds,
					[action.response.agoragrams[0].shortID]: action.response.agoragrams[0]._id
				},
				agoragrams: {
					...state.agoragrams,
					...tree,
					[action.response.agoragrams[0]._id]: {
						...action.response.agoragrams[0]
					}
				},
				starredAgoragrams: state.starredAgoragrams.concat(action.response.starredAgoragrams)
			}
		case 'ASTERI_REQUEST':
			const alreadyStarred = state.starredAgoragrams.indexOf(action.payload.agoragramID)
			const agoragram = state.agoragrams[action.payload.agoragramID]
			if(alreadyStarred !== -1 ) {
				state.starredAgoragrams.splice(alreadyStarred, 1)
				return {
					...state,
					agoragrams: {
						...state.agoragrams,
						[action.payload.agoragramID]: {
							...agoragram,
							stars: agoragram.stars - 1
						}
					}
				}
			}
			else return {
				...state,
				starredAgoragrams: [...state.starredAgoragrams, action.payload.agoragramID],
				agoragrams: {
					...state.agoragrams,
					[action.payload.agoragramID]: {
						...agoragram,
						stars: agoragram.stars + 1
					}
				}
			}
			// return {
			// 	...state,
			// 	agoragrams: {
			// 		...state.agoragrams,
			// 		// [action.payload.agoragramID]:
			// 	}
			// }
			return state
		case 'AGORIZE_REQUEST':
			if(action.payload.type === "comment") return {
				...state,
				agorizing: state.agorizing.concat(action.payload.replyTo),
			}
			return state
		case 'AGORIZE_SUCCESS':
			if(action.payload.type === "comment") {
				return {
					...state,
					agorized: state.agorized.concat(action.payload.replyTo)
				}
			}
			return state
		case 'AGORIZE_FAILURE':
			return state
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
