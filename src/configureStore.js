import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import thunkMiddleware from 'redux-thunk'
import reducer from 'reducers'
import callAPIMiddleware from './callAPIMiddleware'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['Auth', 'State', 'Settings']
}

const persistedReducer = persistReducer(persistConfig, reducer)

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunkMiddleware, callAPIMiddleware))
  let persistor = persistStore(store)
  return { store, persistor }
}
