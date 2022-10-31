import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

type Task = {
  title: string
  description: string
  assignedTo: string
  assignedAt: string
  location: string
  username: string
}

export type DBTask = Task & {
  _id: string
  isDone: boolean
  progress: string
  compleatedAt: string
}

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  allTasks: [] as DBTask[],
  successMessage: '',
  errorMessage: '',
}

//Assign taks
export const assignTask = createAsyncThunk(
  'assign-task',
  async (taskData: Task, thunkAPI) => {
    try {
      const response = await axios.post('/task', taskData)
      if (response) {
        thunkAPI.dispatch(setSuccessMessage(response.data.message))
        return response.data
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        thunkAPI.dispatch(setErrorMessage(error.response?.data.message))
      }
    }
  }
)

export const getAllTasks = createAsyncThunk(
  'all-tasks',
  async (e, thunkAPI) => {
    try {
      const response = await axios.get('/task')
      if (response) return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        thunkAPI.dispatch(setErrorMessage(error.response?.data.message))
      }
    }
  }
)

export const getEmployeeTasks = createAsyncThunk(
  'employee-tasks',
  async (userId: string, thunkAPI) => {
    try {
      const response = await axios.get(`/task/${userId}`)
      if (response) {
        return response.data
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        thunkAPI.dispatch(setErrorMessage(error.response?.data.message))
      }
    }
  }
)

export const getCompletedTasks = createAsyncThunk(
  'completed-tasks',
  async (e, thunkAPI) => {
    try {
      const response = await axios.get('/task/completed-tasks')
      if (response) return response.data
    } catch (error) {
      if (axios.isAxiosError(error))
        thunkAPI.dispatch(setErrorMessage(error.response?.data.message))
    }
  }
)

export const completeTask = createAsyncThunk(
  'compleate-task',
  async ({ taskId }: { taskId: string; multi?: boolean }, thunkAPI) => {
    try {
      const response = await axios.patch(`/task/${taskId}`)
      if (response) {
        thunkAPI.dispatch(setSuccessMessage(response.data.message))
        thunkAPI.dispatch(getEmployeeTasks('634599a0ed37396a3161db13'))
      }
    } catch (error) {
      if (axios.isAxiosError(error))
        thunkAPI.dispatch(setErrorMessage(error.response?.data.message))
    }
  }
)

export const deleteTask = createAsyncThunk(
  'delete-task',
  async ({ taskId, multi }: { taskId: string; multi?: boolean }, thunkAPI) => {
    try {
      const response = await axios.delete(`/task/${taskId}`)
      if (response) thunkAPI.dispatch(setSuccessMessage(response.data.message))
      if (multi) {
        thunkAPI.dispatch(getAllTasks())
      } else {
        thunkAPI.dispatch(getEmployeeTasks('634599a0ed37396a3161db13'))
      }
    } catch (error) {
      if (axios.isAxiosError(error))
        thunkAPI.dispatch(setErrorMessage(error.response?.data.message))
    }
  }
)

export const editTask = createAsyncThunk(
  'edit-task',
  async (
    { taskData, multi }: { taskData: DBTask; multi?: boolean },
    thunkAPI
  ) => {
    try {
      const response = await axios.put(`/task/${taskData._id}`, taskData)
      if (response) thunkAPI.dispatch(setSuccessMessage(response.data.message))
      if (multi) {
        thunkAPI.dispatch(getAllTasks())
      } else {
        thunkAPI.dispatch(getEmployeeTasks('634599a0ed37396a3161db13'))
      }
    } catch (error) {
      if (axios.isAxiosError(error))
        thunkAPI.dispatch(setErrorMessage(error.response?.data.message))
    }
  }
)

const taskSlice = createSlice({
  name: 'tasks',
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
      .addCase(assignTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(assignTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        if (typeof action.payload === 'string') {
          state.message = action.payload
        }
      })
      .addCase(assignTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allTasks = action.payload
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.isLoading = true
        state.isError = true
      })
      .addCase(getEmployeeTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEmployeeTasks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allTasks = action.payload
      })
      .addCase(getEmployeeTasks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(getCompletedTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCompletedTasks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allTasks = action.payload
      })
      .addCase(getCompletedTasks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(completeTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(completeTask.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(completeTask.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(editTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editTask.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(editTask.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(deleteTask.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export const { reset, setErrorMessage, setSuccessMessage, setMessage } =
  taskSlice.actions
export default taskSlice.reducer
