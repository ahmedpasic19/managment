import { useEffect, forwardRef, useState, MouseEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { DBUser, getAllUsers } from '../../features/users/userSlice'
import {
  assignTask,
  setErrorMessage,
  setSuccessMessage,
} from '../../features/tasks/taskSlice'
import MaterialTable, { Icons } from 'material-table'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'

import AssignTskModal from '../../components/modals/AssignTaskModal'

//Icons
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'

type Task = {
  title: string
  description: string
  assignedTo: string
  assignedAt: string
  location: string
  username: string
}

const AssignTasks = () => {
  const { users } = useAppSelector((state) => state.users)

  const { successMessage, errorMessage, isSuccess, isError } = useAppSelector(
    (state) => state.tasks
  )

  const [open, setOpen] = useState(false)
  const [newTask, setNewTask] = useState({} as Task)
  const [user, setUser] = useState({} as DBUser)

  const dispatch = useAppDispatch()

  const tableIcons: Icons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  }

  //Toasts
  const fields = () => {
    toast.error('Input all fileds', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnHover: false,
    })
  }
  const error = (errorMessage: string) => {
    toast.error(errorMessage, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnHover: false,
    })
  }
  const success = (successMessage: string) => {
    toast.success(successMessage, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnHover: false,
    })
  }

  useEffect(() => {
    if (errorMessage) {
      error(errorMessage)
      dispatch(setErrorMessage(''))
    }
    if (successMessage) {
      success(successMessage)
      dispatch(setSuccessMessage(''))
      setOpen(false)
    }
  }, [errorMessage, successMessage, isError, isSuccess])

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  const columns = [
    { title: 'Email', field: 'email' },
    { title: 'First name', field: 'firstName' },
    { title: 'Last name', field: 'lastName' },
    { title: 'User type', field: 'userType' },
  ]

  const userDataArray = users?.filter((user) => {
    if (user.userType === 'employee') return user
  })

  const userData = userDataArray?.map((user) => ({ ...user }))

  const handleCreateTask = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    let keys = Object.values(newTask).every((key) => key.trim())
    if (!keys) return fields()
    if (keys)
      dispatch(
        assignTask({
          ...newTask,
          assignedAt: '12:00',
          assignedTo: user._id,
          username: user.firstName,
        })
      )
  }

  return (
    <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ToastContainer />
      <h1>Assign task</h1>
      <div style={{ width: '80%' }}>
        <MaterialTable
          icons={tableIcons}
          columns={columns}
          title='All employees'
          data={userData}
          // actions={actions}
          onRowClick={(e, data) => {
            if (data) {
              setUser(data)
              setOpen(true)
            }
          }}
          options={{
            actionsColumnIndex: -1,
          }}
        />
      </div>
      <AssignTskModal
        open={open}
        onClose={() => {
          setOpen(false)
          setNewTask({} as Task)
        }}
        newTask={newTask}
        setNewTask={setNewTask}
        handleCreateTask={handleCreateTask}
      />
      <ToastContainer />
    </div>
  )
}

export default AssignTasks
