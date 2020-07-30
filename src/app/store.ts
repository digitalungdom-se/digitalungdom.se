import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import agora from 'features/agora/agoraSlice';
import auth from 'features/auth/authSlice';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import users from 'features/users/usersSlice';

const persistConfig = {
  blacklist: ['auth'],
  key: 'root',
  storage,
};

const authPersistConfig = {
  blacklist: ['dialog'],
  key: 'auth',
  storage: storage,
};

const rootReducer = combineReducers({
  agora,
  auth: persistReducer(authPersistConfig, auth),
  users,
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
