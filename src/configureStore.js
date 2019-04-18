import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import thunkMiddleware from 'redux-thunk'
import reducer from 'reducers'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['Auth', 'State']
}

const persistedReducer = persistReducer(persistConfig, reducer)

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunkMiddleware))
  let persistor = persistStore(store)
  return { store, persistor }
}
