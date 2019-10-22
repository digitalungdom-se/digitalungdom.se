import { applyMiddleware, createStore } from 'redux'
import { persistStore } from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
import callAPIMiddleware from './callAPIMiddleware'
import { composeWithDevTools } from 'redux-devtools-extension';
import persistedReducer from 'reducers'

// const rootReducer = combineReducers(
// 	reducer,
// 	{
// 		Auth: persistReducer(authPersistConfig, authReducer)
// 	}
// )

// const persistedReducer = persistReducer( persistConfig, reducer )
// export default persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore( persistedReducer, composeWithDevTools(
    applyMiddleware( thunkMiddleware, callAPIMiddleware )
  ) )
  let persistor = persistStore( store )
  return { store, persistor }
}
