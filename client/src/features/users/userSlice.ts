import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setAccessToken } from '../auth/authSlice'

const initialState = {
  user: {},
  users: [] as DBUser[],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  usersSuccessMessage: '',
  usersErrorMessage: '',
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
        thunkAPI.dispatch(setUserSuccessMessage(response?.data.message))
        return response.data
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        thunkAPI.dispatch(setUserErrorMessage(error.response?.data.message))
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
        thunkAPI.dispatch(setUserSuccessMessage(response?.data.message))
        thunkAPI.dispatch(setAccessToken(response.data.accessToken))
        return response.data
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        thunkAPI.dispatch(setUserErrorMessage(error.response?.data.message))
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
      setUserErrorMessage(error.response?.data.message)
    }
  }
})

export const editUser = createAsyncThunk(
  'edit-user',
  async (userData: DBUser, thunkAPI) => {
    try {
      const response = await axios.put(`/user/${userData._id}`, userData)
      if (response) {
        thunkAPI.dispatch(setUserSuccessMessage(response.data.message))
        thunkAPI.dispatch(getAllUsers())
      }
    } catch (error) {
      if (axios.isAxiosError(error))
        thunkAPI.dispatch(setUserErrorMessage(error.response?.data.message))
    }
  }
)

export const deleteUser = createAsyncThunk(
  'delete-task',
  async (userId: string, thunkAPI) => {
    try {
      const response = await axios.delete(`/user/${userId}`)
      if (response)
        thunkAPI.dispatch(setUserSuccessMessage(response.data.message))
      thunkAPI.dispatch(getAllUsers())
    } catch (error) {
      if (axios.isAxiosError(error))
        thunkAPI.dispatch(setUserErrorMessage(error.response?.data.message))
    }
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.user = {}
      state.users = []
    },
    setUserErrorMessage: (state, action) => {
      state.usersErrorMessage = action.payload
    },
    setUserSuccessMessage: (state, action) => {
      state.usersSuccessMessage = action.payload
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
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export const {
  resetUsers,
  setUserErrorMessage,
  setUserSuccessMessage,
  setMessage,
} = userSlice.actions
export default userSlice.reducer
