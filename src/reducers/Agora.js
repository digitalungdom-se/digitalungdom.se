const initialState = {
	posts: [
	{
		user: {
			username: 'Nautman',
			name: 'Douglas Bengtsson'
		},
		date: new Date('2019-02-18'),
		text: 'Hello',
		title: 'Digitalt rådslag!',
		stars: 10,
		comments: 121
	}
	]
}

const Agora = (state = initialState, action) => {
	switch(action.type) {
		
		case 'REQUEST_AGORA_PUBLISH_POST':
			return {
				...state,
				publishing_post: true
			}
			break
		case 'RESPONSE_AGORA_PUBLISH_POST':
			return {
				...state,
				publishing_post: action.type
			}
			break
		case 'REQUEST_AGORA_PUBLISH_LINK':
			return {
				...state,
				publishing_post: true
			}
			break
		case 'RESPONSE_AGORA_PUBLISH_LINK':
			return {
				...state,
				publishing_post: action.type
			}
			break
		case 'REQUEST_AGORA_PUBLISH_QUESTION':
			return {
				...state,
				publishing_post: true
			}
			break
		case 'RESPONSE_AGORA_PUBLISH_QUESTION':
			return {
				...state,
				publishing_post: action.type
			}
			break
		case 'REQUEST_AGORA_PUBLISH_COMMENT':
			return {
				...state,
				publishing_comment: true
			}
			break
		case 'RESPONSE_AGORA_PUBLISH_COMMENT':
			return {
				...state,
				publishing_comment: action.type
			}
			break
		case 'REQUEST_ANTI_AGORIZE':
			return {
				...state,
				anti_agorizing: action.postId
			}
			break
		case 'RESPONSE_ANTI_AGORIZE':
			return {
				...state,
				anti_agorizing: action.type
			}
			break
		case 'REQUEST_META_AGORIZE':
			return {
				...state,
				meta_agorizing: action.postId
			}
			break
		case 'RESPONSE_META_AGORIZE':
			return {
				...state,
				meta_agorizing: action.type
			}
			break
		case 'REQUEST_GET_AGORAGRAMS':
			return {
				...state,
				getting_agoragrams: true
			}
			break
		case 'RESPONSE_GET_AGORAGRAMS':
			return {
				...state,
				agoragrams: action.posts
			}
			break
		case 'REQUEST_GET_AGORAGRAM':
			return {
				...state,
				getting_agoragram: true
			}
			break
		case 'RESPONSE_GET_AGORAGRAM':
			return {
				...state,
				agoragram: action.posts
			}
			break
		default:
			return state
	}
}

export default Agora
