import { configureStore, combineReducers, AnyAction } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PersistConfig,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';

import { authApi } from '../api/auth.api';

import userReducer from './user';

const reducer = combineReducers({
  user: userReducer,
  [authApi.reducerPath]: authApi.reducer,
});
const customMiddleware = [authApi.middleware];

const rootReducer = (
  state: ReturnType<typeof reducer> | undefined,
  action: AnyAction,
) => {
  if (action.type === 'LOGOUT') {
    return reducer(undefined, action);
  }
  return reducer(state, action);
};

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  storage: localStorage,
  whitelist: ['user'],
  timeout: 0,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(customMiddleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
