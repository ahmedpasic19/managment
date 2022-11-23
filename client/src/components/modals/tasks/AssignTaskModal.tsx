import ReactDOM from 'react-dom'
import { ChangeEvent, MouseEvent, FormEvent } from 'react'
import { DBUser } from '../../../features/users/userSlice'
import { useAppDispatch } from '../../../app/hooks'
import { toast } from 'react-toastify'
import usePrivateRoute from '../../../hooks/usePrivateRoute'
import { assignTask } from '../../../features/tasks/taskSlice'

type Task = {
  title: string
  description: string
  assignedTo: string
  assignedAt: string
  location: string
  username: string
}

type Props = {
  open: boolean
  onClose: () => void
  newTask: Task
  setNewTask: (value: Task) => void
  user: DBUser
}

const AssignTskModal = ({
  open,
  onClose,
  newTask,
  setNewTask,
  user,
}: Props) => {
  const dispatch = useAppDispatch()

  const privateRoute = usePrivateRoute()

  if (!open) return null

  const fields = () => {
    toast.error('Input all fileds', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      pauseOnHover: false,
    })
  }

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    let value = e.target.value
    let name = e.target.name
    let newObj = { ...newTask }
    newObj[name as 'location' | 'description' | 'location'] = value
    setNewTask(newObj)
  }

  const handleCreateTask = (
    e: MouseEvent<HTMLElement> | FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    let keys = Object.values(newTask).every((key) => key.trim())
    if (!keys) return fields()
    if (keys)
      dispatch(
        assignTask({
          privateRoute,
          taskData: {
            ...newTask,
            assignedAt: '12:00',
            assignedTo: user._id,
            username: user.firstName,
          },
        })
      )
  }

  return ReactDOM.createPortal(
    <>
      <div className='overlay' onClick={onClose} />
      <div className='modal'>
        <div>
          <h1 className='font-bold text-4xl text-pb my-10'>Assign task</h1>
        </div>
        <form onSubmit={handleCreateTask}>
          <div>
            <div>
              <label>Title</label>
            </div>
            <input type='text' name='title' onChange={handleOnchange} />
          </div>
          <div>
            <div>
              <label>Description</label>
            </div>
            <input type='text' name='description' onChange={handleOnchange} />
          </div>
          <div>
            <div>
              <label>Location</label>
            </div>
            <input type='text' name='location' onChange={handleOnchange} />
          </div>
        </form>

        <section>
          <button className='reject-button' onClick={onClose}>
            Close
          </button>
          <button className='confirm-button' onClick={handleCreateTask}>
            Assign
          </button>
        </section>
      </div>
    </>,
    document.getElementById('portal')!
  )
}

export default AssignTskModal
