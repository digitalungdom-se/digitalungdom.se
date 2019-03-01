import { combineReducers } from 'redux'
import Log from './Log.js'
import Auth from './Auth.js'
import Login from './Login.js'
import Register from './Register.js'
import Users from './Users.js'
import Agora from './Agora.js'

export default combineReducers({
	Log,
	Login,
	Register,
	Users,
	Auth,
	Agora
})
