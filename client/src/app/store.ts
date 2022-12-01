import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userReducer from '../features/users/userSlice'
import taskReducer from '../features/tasks/taskSlice'
import authReducer from '../features/auth/authSlice'
import notificationReducer from '../features/notifications/notificationsSlice'

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

//Persist data on window reload
const persistedUserReducer = persistReducer(persistConfig, userReducer)
const persistedTaskReducer = persistReducer(persistConfig, taskReducer)
const persistedAuthReducer = persistReducer(persistConfig, authReducer)
const persistedNotificationReducer = persistReducer(
  persistConfig,
  notificationReducer
)

export const store = configureStore({
  reducer: {
    users: persistedUserReducer,
    tasks: persistedTaskReducer,
    auth: persistedAuthReducer,
    notifications: persistedNotificationReducer,
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
