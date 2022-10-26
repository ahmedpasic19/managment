import MaterialTable, { Icons } from 'material-table'
import {
  getAllTasks,
  getEmployeeTasks,
  setErrorMessage,
  setSuccessMessage,
} from '../../features/tasks/taskSlice'
import { useEffect, useState, forwardRef, MouseEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { DBTask } from '../../features/tasks/taskSlice'
import { deleteTask, completeTask } from '../../features/tasks/taskSlice'
import { toast, ToastContainer } from 'react-toastify'

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
import CheckIcon from '@mui/icons-material/Check'

import CompleteTaskModal from '../../components/modals/CompleteTaskModal'
import DeleteTaskModal from '../../components/modals/DeleteTaskModal'

const Tasks = () => {
  const { allTasks, successMessage, errorMessage, isSuccess, isError } =
    useAppSelector((state) => state.tasks)

  const dispatch = useAppDispatch()

  //ID from local storage
  const userId = '634599a0ed37396a3161db13'
  // const userId = false

  useEffect(() => {
    if (!userId) dispatch(getAllTasks())
    if (userId) dispatch(getEmployeeTasks(userId))
  }, [])

  const [openComplete, setOpenComplete] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
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
  console.log(allTasks)
  const taskData = allTasks?.map((task) => ({ ...task }))

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
      setOpenComplete(false)
      setOpenDelete(false)
    }
  }, [errorMessage, successMessage, isError, isSuccess])

  const handleDeleteTask = (e: MouseEvent) => {
    e.preventDefault()
    dispatch(deleteTask(task._id))
  }

  const handleCompleteTask = (e: MouseEvent) => {
    e.preventDefault()
    dispatch(completeTask(task._id))
  }

  return (
    <div style={{ width: '80%' }}>
      <ToastContainer />
      <MaterialTable
        icons={tableIcons}
        title='Employee tasks'
        columns={columns}
        data={taskData}
        actions={[
          {
            icon: () => <DeleteOutline />,
            tooltip: 'Delete task',
            onClick: (event, rowData) => {
              if (rowData instanceof Array) return
              if (rowData) {
                setTask(rowData)
                setOpenDelete(true)
              }
            },
          },
          {
            icon: () => <Edit />,
            tooltip: 'Edit task',
            onClick: (event, rowData) => {
              console.log(rowData)
              setOpenComplete(true)
            },
          },
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
      <DeleteTaskModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        deleteTask={handleDeleteTask}
        taskId={task._id}
      />
    </div>
  )
}

export default Tasks
