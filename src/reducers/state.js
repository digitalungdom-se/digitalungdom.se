export default (state = {}, action) => {
	switch(action.type) {
		case 'ADD_FUNCTION':
			return {
				...state,
				[action.name]: {
					method: action.method,
					route: action.route,
					template: action.template
				}
			}
		case 'REMOVE_FUNCTION':
			const newState = {}
			const f = Object.keys(state).forEach(func => { if(func !== action.name) newState[func] = state[func]})
			return newState
		default:
			return state
	}
}
