import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import Agora from './agora.js'
import Auth from './auth.js'
import Log from './log.js'
import Posts from './posts.js'
import Settings from './settings.js'
import State from './state.js'
import Users from './users.js'
import Register from './register.js'
import ProfilePictures from './profilePictures.js'

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: [ 'State', 'Settings' ]
}

const authPersistConfig = {
  key: 'Auth',
  storage: storage,
  blacklist: ['loggingInError']
}

const rootReducer = combineReducers( {
  Agora,
  Auth: persistReducer(authPersistConfig, Auth),
  Log,
  Posts,
  Settings,
  State,
  Users,
  Register,
  ProfilePictures
} )

export default persistReducer(rootPersistConfig, rootReducer)
