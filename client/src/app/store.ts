import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userReducer from '../features/users/userSlice'
import taskReducer from '../features/tasks/taskSlice'
import authReducer from '../features/auth/authSlice'

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedUserReducer = persistReducer(persistConfig, userReducer)
const persistedTaskReducer = persistReducer(persistConfig, taskReducer)
const persistedAuthReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    users: persistedUserReducer,
    tasks: persistedTaskReducer,
    auth: persistedAuthReducer,
  },
})

export const persistore = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
