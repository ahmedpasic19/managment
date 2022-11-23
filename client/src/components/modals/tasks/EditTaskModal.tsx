import ReactDOM from 'react-dom'
import { ChangeEvent, MouseEvent } from 'react'
import { DBTask, editTask } from '../../../features/tasks/taskSlice'
import { useAppDispatch } from '../../../app/hooks'
import { DBUser } from '../../../features/users/userSlice'
import usePrivateRoute from '../../../hooks/usePrivateRoute'

type Props = {
  open: boolean
  onClose: () => void
  task: DBTask
  setTask: (value: DBTask) => void
  employeeEdit?: boolean | string
  employees?: DBUser[]
  multi?: boolean
}

const EditTaskModal = ({
  open,
  onClose,
  task,
  employeeEdit,
  setTask,
  multi,
}: Props) => {
  const dispatch = useAppDispatch()

  const privateRoute = usePrivateRoute()

  if (!open) return null

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    setTask({ ...task, ...{ [e.target.name]: value } })
  }

  const submit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (
      task.location !== '' ||
      task.description !== '' ||
      task.assignedTo !== '' ||
      task.compleatedAt !== ''
    )
      if (multi) {
        dispatch(editTask({ privateRoute, taskData: task, multi }))
      } else {
        dispatch(editTask({ privateRoute, taskData: task }))
      }
  }

  return ReactDOM.createPortal(
    <>
      <div className='overlay' onClick={onClose} />
      <div className='modal'>
        <div>
          <h1 className='font-bold text-4xl text-pb my-10'>Edit task</h1>
        </div>
        <form action=''>
          <div>
            <div>
              <label>Title</label>
            </div>
            <input
              type='text'
              defaultValue={task.title}
              name='title'
              onChange={handleChange}
            />
          </div>
          <div>
            <div>
              <label>Description</label>
            </div>
            <input
              type='text'
              defaultValue={task.description}
              name='description'
              onChange={handleChange}
            />
          </div>
          {employeeEdit === false || !!employeeEdit ? (
            <div>
              <div>
                <label>Location</label>
              </div>
              <input
                type='text'
                defaultValue={task.location}
                name='location'
                onChange={handleChange}
              />
            </div>
          ) : null}
          <div>
            <div>
              <label>Progress status</label>
            </div>
            <select name='process'>
              <option value='awaiting'>Awaiting</option>
              <option value='process'>Working on it</option>
              <option value='completed'>Completed</option>
            </select>
          </div>
        </form>
        <section>
          <button className='reject-button' onClick={onClose}>
            Close
          </button>
          <button className='confirm-button' onClick={submit}>
            Save
          </button>
        </section>
      </div>
    </>,
    document.getElementById('portal')!
  )
}

export default EditTaskModal
