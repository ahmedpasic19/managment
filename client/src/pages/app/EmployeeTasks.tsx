import MaterialTable from 'material-table'
import {
  getAllTasks,
  getEmployeeTasks,
  setErrorMessage,
  setSuccessMessage,
} from '../../features/tasks/taskSlice'
import { useEffect, useState, MouseEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { DBTask } from '../../features/tasks/taskSlice'
import { completeTask } from '../../features/tasks/taskSlice'
import { toast, ToastContainer } from 'react-toastify'

//Icons
import CheckIcon from '@mui/icons-material/Check'
//Modals
import CompleteTaskModal from '../../components/modals/tasks/CompleteTaskModal'

const EmployeeTasks = () => {
  const { allTasks, successMessage, errorMessage, isSuccess, isError } =
    useAppSelector((state) => state.tasks)

  const dispatch = useAppDispatch()

  //ID from local storage
  const userId = '635eb1572f1019d89eccbba8'
  // const userId = false

  useEffect(() => {
    if (!userId) dispatch(getAllTasks())
    if (userId) dispatch(getEmployeeTasks(userId))
  }, [])

  const [openComplete, setOpenComplete] = useState(false)
  const [task, setTask] = useState({} as DBTask)

  const columns = [
    { title: 'Title', field: 'title' },
    { title: 'Description', field: 'description' },
    { title: 'Location', field: 'location' },
    { title: 'User', field: 'username' },
    { title: 'Progress', field: 'progress' },
    // { title: 'Done', field: 'isDone' },
    { title: 'Compleated at', field: 'compleatedAt' },
    { title: 'Assigned at', field: 'assignedAt' },
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
    <div>
      <ToastContainer />
      <MaterialTable
        // icons={tableIcons}
        title='Employee tasks'
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
        completeTask={completeTask}
        task={task}
      />
    </div>
  )
}

export default EmployeeTasks
