import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userReducer from '../features/users/userSlice'
import taskReducer from '../features/tasks/taskSlice'

export const store = configureStore({
  reducer: {
    users: userReducer,
    tasks: taskReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
