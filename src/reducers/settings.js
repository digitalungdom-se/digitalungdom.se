export default (state = {theme: "light"}, action) => {
	switch(action.type) {
		case 'CHANGE_THEME':
			return {
				...state,
				theme: action.choice.choice
			}
		default:
			return state
	}
}
