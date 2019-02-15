import { combineReducers } from 'redux'
import Log from './Log.js'
import Auth from './Auth.js'
import Login from './Login.js'
import Register from './Register.js'

export default combineReducers({
	Log,
	Login,
	Register,
	Auth
})
