import { combineReducers } from 'redux'
import Agora from './agora.js'
import Auth from './auth.js'
import Log from './log.js'
import Posts from './posts.js'
import State from './state.js'
import Users from './users.js'

export default combineReducers({
	Agora,
	Auth,
	Log,
	Posts,
	State,
	Users
})
