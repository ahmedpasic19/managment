import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosInstance } from 'axios'

export type TNotification = {
  title: string
  description: string
  assignedTo: string
}
export type TDBNotification = {
  _id: string
  title: string
  description: string
  assignedTo: string
}

const initialState = {
  notifications: [] as TDBNotification[],
  notificationErrorMessage: '',
  notificationSuccessMessage: '',
  isLoading: false,
  isSuccess: false,
  isError: false,
}

//GET users notifications
export const getNotifications = createAsyncThunk(
  'get-notifications',
  async (privateRoute: AxiosInstance, thunkAPI) => {
    try {
      const response = await privateRoute.get('/notifications')
      if (response) return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        thunkAPI.dispatch(
          setNotificationErrorMessage(error.response?.data.message)
        )
      }
    }
  }
)

//POST a notificatin
export const createNotification = createAsyncThunk(
  'create-notification',
  async (
    {
      privateRoute,
      taskCreated,
      userId,
    }: { privateRoute: AxiosInstance; taskCreated: boolean; userId: string },
    thunkAPI
  ) => {
    try {
      const response = await privateRoute.post(`/notifications`, {
        taskCreated,
        userId,
      })
      if (response) {
        thunkAPI.dispatch(getNotifications(privateRoute))
        return response.data
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        thunkAPI.dispatch(
          setNotificationErrorMessage(error.response?.data.message)
        )
      }
    }
  }
)

//DELETE all notifications
export const deleteAllNotifications = createAsyncThunk(
  'delete-all-notification',
  async (privateRoute: AxiosInstance, thunkAPI) => {
    try {
      const response = await privateRoute.delete('/notifications')
      if (response) return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        thunkAPI.dispatch(
          setNotificationErrorMessage(error.request.data.message)
        )
      }
    }
  }
)

//DELETE notification
export const deleteNotification = createAsyncThunk(
  'delete-notification',
  async (
    {
      notificationId,
      privateRoute,
    }: { notificationId: string; privateRoute: AxiosInstance },
    thunkAPI
  ) => {
    try {
      const response = await privateRoute.delete(
        `/notifications/${notificationId}`
      )
      if (response) {
        thunkAPI.dispatch(getNotifications(privateRoute))
        return response.data
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        thunkAPI.dispatch(
          setNotificationErrorMessage(error.response?.data.message)
        )
      }
    }
  }
)

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    reset: (state, action) => {
      state = initialState
    },
    setNotificationErrorMessage: (state, action) => {
      state.notificationErrorMessage = action.payload
    },
    setNotificationSuccessMessage: (state, action) => {
      state.notificationSuccessMessage = action.payload
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        if (Array.isArray(action.payload)) {
          state.notifications = action.payload
        }
      })
      .addCase(createNotification.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNotification.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(deleteAllNotifications.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAllNotifications.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(deleteAllNotifications.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(deleteNotification.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
  },
})

export const { setNotificationErrorMessage, setNotificationSuccessMessage } =
  notificationSlice.actions
export default notificationSlice.reducer
