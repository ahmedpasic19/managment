import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  user: {},
  users: [] as DBUser[],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  successMessage: '',
  errorMessage: '',
}

type User = {
  firstName: string
  lastName: string
  password: string
  email: string
  phoneNumber: number
  userType: string
  refreshToken?: string
}

export type DBUser = User & { _id: string }

type LoginUser = {
  email: string
  password: string
}

export const registerUser = createAsyncThunk(
  'create-user',
  async (userData: User, thunkAPI) => {
    try {
      const response = await axios.post('/user', userData)
      if (response) {
        thunkAPI.dispatch(setSuccessMessage(response?.data.message))
        return response.data
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        thunkAPI.dispatch(setErrorMessage(error.response?.data.message))
      }
    }
  }
)

export const loginUser = createAsyncThunk(
  'login-user',
  async (userData: LoginUser, thunkAPI) => {
    try {
      const response = await axios.post('/user/login', userData)
      if (response) {
        thunkAPI.dispatch(setSuccessMessage(response?.data.message))
        return response.data
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        thunkAPI.dispatch(setErrorMessage(error.response?.data.message))
      }
    }
  }
)

export const getAllUsers = createAsyncThunk('get-all-users', async () => {
  try {
    const response = await axios.get('/user')
    if (response) {
      return response.data
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      setErrorMessage(error.response?.data.message)
    }
  }
})

export const editUser = createAsyncThunk(
  'edit-user',
  async (userData: DBUser, thunkAPI) => {
    try {
      const response = await axios.put(`/user/${userData._id}`, userData)
      if (response) thunkAPI.dispatch(setSuccessMessage(response.data.message))
    } catch (error) {
      if (axios.isAxiosError(error))
        thunkAPI.dispatch(setErrorMessage(error.response?.data.message))
    }
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload
    },
    setMessage: (state, action) => {
      state.message = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      //Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.user
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        if (typeof action.payload === 'string') {
          state.message = action.payload
        }
      })
      //Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.user = action.payload.user
        if (typeof action.payload === 'string') {
          state.message = action.payload
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        if (typeof action.payload === 'string') {
          state.message = action.payload
        }
      })
      //GET all users
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        if (typeof action.payload === 'string') {
          state.message = action.payload
        }
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users = action.payload
        if (typeof action.payload === 'string') {
          state.message = action.payload
        }
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
  },
})

export const { reset, setErrorMessage, setSuccessMessage, setMessage } =
  userSlice.actions
export default userSlice.reducer
