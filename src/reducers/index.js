import { combineReducers } from 'redux'
import Agora from './agora.js'
import Auth from './auth.js'
import Log from './log.js'
import Posts from './posts.js'
import Settings from './settings.js'
import State from './state.js'
import Users from './users.js'
import Register from './register.js'

export default combineReducers({
	Agora,
	Auth,
	Log,
	Posts,
	Settings,
	State,
	Users,
	Register
})
