import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import auth from 'features/auth/authSlice';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
