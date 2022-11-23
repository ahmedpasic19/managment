import MaterialTable from 'material-table'
import {
  getEmployeeTasks,
  setErrorMessage,
  setSuccessMessage,
} from '../../features/tasks/taskSlice'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { DBTask } from '../../features/tasks/taskSlice'
import { toast, ToastContainer } from 'react-toastify'

//Icons
import CheckIcon from '@mui/icons-material/Check'
//Modals
import CompleteTaskModal from '../../components/modals/tasks/CompleteTaskModal'
import usePrivateRoute from '../../hooks/usePrivateRoute'

const EmployeeTasks = () => {
  const { allTasks, successMessage, errorMessage, isSuccess, isError } =
    useAppSelector((state) => state.tasks)

  const dispatch = useAppDispatch()

  const privateRoute = usePrivateRoute()

  useEffect(() => {
    dispatch(getEmployeeTasks({ privateRoute }))
  }, [])

  const [openComplete, setOpenComplete] = useState(false)
  const [task, setTask] = useState({} as DBTask)

  const columns = [
    { title: 'Title', field: 'title' },
    { title: 'Description', field: 'description' },
    { title: 'Location', field: 'location' },
    { title: 'User', field: 'username' },
    { title: 'Progress', field: 'progress' },
    { title: 'Compleated at', field: 'compleatedAt' },
  ]

  const taskData = allTasks.map((task) => ({ ...task }))

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

  useEffect(() => {
    if (errorMessage) {
      error(errorMessage)
      dispatch(setErrorMessage(''))
    }
    if (successMessage) {
      success(successMessage)
      dispatch(setSuccessMessage(''))
      setOpenComplete(false)
    }
  }, [errorMessage, successMessage, isError, isSuccess])

  return (
    <div className='w-full h-full'>
      <ToastContainer />
      <div className='w-full flex justify-center items-center mt-10'>
        <h1 className='font-bold text-4xl'>Employee Tasks</h1>
      </div>
      <div className='mt-10'>
        <MaterialTable
          style={{ zIndex: 1 }}
          title=''
          columns={columns}
          data={taskData}
          actions={[
            {
              icon: () => <CheckIcon />,
              tooltip: 'Compleate task',
              onClick: (event, rowData) => {
                if (rowData instanceof Array) return
                if (rowData) {
                  setOpenComplete(true)
                  setTask(rowData)
                }
              },
            },
          ]}
          options={{ actionsColumnIndex: -1 }}
        />
        <CompleteTaskModal
          open={openComplete}
          onClose={() => setOpenComplete(false)}
          task={task}
        />
      </div>
    </div>
  )
}

export default EmployeeTasks
