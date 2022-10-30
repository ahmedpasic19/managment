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

import AssignTskModal from '../../components/modals/tasks/AssignTaskModal'
import DeleteUserModal from '../../components/modals/users/DeleteUserModal'

//Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline'

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

  const { usersSuccessMessage, usersErrorMessage } = useAppSelector(
    (state) => state.users
  )

  const [openDelete, setOpenDelete] = useState(false)
  const [openAssign, setOpenAssign] = useState(false)
  const [newTask, setNewTask] = useState({} as Task)
  const [user, setUser] = useState({} as DBUser)

  const dispatch = useAppDispatch()

  //Toasts
  const fields = () => {
    toast.error('Input all fileds', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      pauseOnHover: false,
    })
  }
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
    }
  }, [usersErrorMessage, usersSuccessMessage])

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
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
        />
      </div>
      <AssignTskModal
        open={openAssign}
        onClose={() => {
          setOpenAssign(false)
          setNewTask({} as Task)
        }}
        newTask={newTask}
        setNewTask={setNewTask}
        handleCreateTask={handleCreateTask}
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
