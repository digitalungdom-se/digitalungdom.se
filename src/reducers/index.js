import { combineReducers } from 'redux'
import Agora from './agora.js'
import Auth from './auth.js'
import Posts from './posts.js'
import State from './state.js'
import Log from './log.js'

export default combineReducers({
	Agora,
	Auth,
	Posts,
	Log,
	State
})
