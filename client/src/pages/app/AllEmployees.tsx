import { useEffect, useState, MouseEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  DBUser,
  getAllUsers,
  deleteUser,
  setUserErrorMessage,
  setUserSuccessMessage,
} from '../../features/users/userSlice'
import {
  assignTask,
  setErrorMessage,
  setSuccessMessage,
} from '../../features/tasks/taskSlice'
import MaterialTable from 'material-table'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'

import AssignTaskModal from '../../components/modals/tasks/AssignTaskModal'
import DeleteUserModal from '../../components/modals/users/DeleteUserModal'

//Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import AssignmentIcon from '@mui/icons-material/Assignment'

type Task = {
  title: string
  description: string
  assignedTo: string
  assignedAt: string
  location: string
  username: string
}

const AssignTasks = () => {
  const { users, usersSuccessMessage, usersErrorMessage } = useAppSelector(
    (state) => state.users
  )

  const { successMessage, errorMessage, isSuccess, isError } = useAppSelector(
    (state) => state.tasks
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  const [openDelete, setOpenDelete] = useState(false)
  const [openAssign, setOpenAssign] = useState(false)
  const [newTask, setNewTask] = useState({} as Task)
  const [user, setUser] = useState({} as DBUser)

  //Toasts
  const error = (errorMessage: string) => {
    toast.error(errorMessage, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      pauseOnHover: false,
    })
  }
  const success = (successMessage: string) => {
    toast.success(successMessage, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      pauseOnHover: false,
    })
  }

  //Handeling response messages
  useEffect(() => {
    if (errorMessage) {
      error(errorMessage)
      dispatch(setErrorMessage(''))
    }
    if (successMessage) {
      success(successMessage)
      dispatch(setSuccessMessage(''))
      setOpenAssign(false)
    }
  }, [errorMessage, successMessage, isError, isSuccess])

  useEffect(() => {
    if (usersErrorMessage) {
      error(usersErrorMessage)
      dispatch(setUserErrorMessage(''))
    }
    if (usersSuccessMessage) {
      success(usersErrorMessage)
      dispatch(setUserSuccessMessage(''))
      setOpenDelete(false)
      setOpenAssign(false)
    }
  }, [usersErrorMessage, usersSuccessMessage])

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

  return (
    <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ToastContainer />
      <h1>Assign task</h1>
      <div style={{ width: '80%' }}>
        <MaterialTable
          columns={columns}
          title='All employees'
          data={userData}
          actions={[
            {
              icon: () => <DeleteOutline />,
              tooltip: 'Delete user',
              onClick: (event, rowData) => {
                if (rowData instanceof Array) return
                if (rowData) {
                  setUser(rowData)
                  setOpenDelete(true)
                }
              },
            },
            {
              icon: () => <AssignmentIcon />,
              tooltip: 'Assign new task',
              onClick: (event, rowData) => {
                if (rowData instanceof Array) return
                if (rowData) {
                  setUser(rowData)
                  setOpenAssign(true)
                }
              },
            },
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
        />
      </div>
      <AssignTaskModal
        open={openAssign}
        onClose={() => {
          setOpenAssign(false)
          setNewTask({} as Task)
        }}
        user={user}
        newTask={newTask}
        setNewTask={setNewTask}
        assignTask={assignTask}
      />
      <DeleteUserModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        userId={user._id}
        deleteUser={deleteUser}
      />
      <ToastContainer />
    </div>
  )
}

export default AssignTasks
