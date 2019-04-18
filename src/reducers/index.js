import { combineReducers } from 'redux'
import Agora from './agora'
import Auth from './auth'
import Posts from './posts'
import State from './state'
import Log from './log'

export default combineReducers({
	Agora,
	Auth,
	Posts,
	Log,
	State
})
