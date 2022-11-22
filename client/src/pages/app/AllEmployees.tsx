import { useEffect, useState, MouseEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  DBUser,
  getAllUsers,
  setUserErrorMessage,
  setUserSuccessMessage,
} from '../../features/users/userSlice'
import {
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
import EditUserModal from '../../components/modals/users/EditUserModal'
import usePrivateRoute from '../../hooks/usePrivateRoute'

type Task = {
  title: string
  description: string
  assignedTo: string
  assignedAt: string
  location: string
  username: string
}

const AllEmployees = () => {
  const { users, usersSuccessMessage, usersErrorMessage } = useAppSelector(
    (state) => state.users
  )

  const { successMessage, errorMessage, isSuccess, isError } = useAppSelector(
    (state) => state.tasks
  )

  const dispatch = useAppDispatch()

  const privateRoute = usePrivateRoute()

  useEffect(() => {
    dispatch(getAllUsers(privateRoute))
  }, [])

  const [openDelete, setOpenDelete] = useState(false)
  const [openAssign, setOpenAssign] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
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
      success(usersSuccessMessage)
      setOpenDelete(false)
      setOpenAssign(false)
      setOpenEdit(false)
      dispatch(setUserSuccessMessage(''))
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
    <div className='w-full h-screen'>
      <ToastContainer />
      <div className='w-full flex justify-center items-center my-10'>
        <h1 className='text-4xl font-bold'>All Employees</h1>
      </div>
      <div className='z-10 overflow-x-auto mt-10'>
        <MaterialTable
          columns={columns}
          style={{ zIndex: -1 }}
          title={''}
          data={userData}
          actions={[
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
            {
              icon: () => <Edit />,
              tooltip: 'Edit user',
              onClick: (event, rowData) => {
                if (rowData instanceof Array) return
                if (rowData) {
                  setUser(rowData)
                  setOpenEdit(true)
                }
              },
            },
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
      <AssignTaskModal
        open={openAssign}
        onClose={() => {
          setOpenAssign(false)
          setNewTask({} as Task)
        }}
        user={user}
        newTask={newTask}
        setNewTask={setNewTask}
      />
      <DeleteUserModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        userId={user._id}
      />
      <EditUserModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        user={user}
        setUser={setUser}
      />
      <ToastContainer />
    </div>
  )
}

export default AllEmployees
