import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { DBUser } from '../users/userSlice'

const initialState = {
  refreshToken: '',
  accessToken: '',
  user: {} as DBUser,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
}

export const refreshToken = createAsyncThunk(
  'refresh-token',
  async (e, thunkAPI) => {
    try {
      const response = await axios.get('/refresh', { withCredentials: true })
      if (response) return response.data.accessToken
    } catch (error) {
      if (axios.isAxiosError(error))
        thunkAPI.dispatch(setErrorMessage(error.response?.data.message))
    }
  }
)

export const logout = createAsyncThunk('logout', async (e, thunkAPI) => {
  try {
    const response = await axios.get('/logout', { withCredentials: true })
    if (response) return response.data
  } catch (error) {
    if (axios.isAxiosError(error))
      thunkAPI.dispatch(setErrorMessage(error.response?.data.message))
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.accessToken = action.payload
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export const { reset, setErrorMessage, setAccessToken } = authSlice.actions
export default authSlice.reducer
