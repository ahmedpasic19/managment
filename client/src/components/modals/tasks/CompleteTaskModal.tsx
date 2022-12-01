import ReactDOM from 'react-dom'
import { completeTask, DBTask } from '../../../features/tasks/taskSlice'
import { MouseEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import usePrivateRoute from '../../../hooks/usePrivateRoute'
import { createNotification } from '../../../features/notifications/notificationsSlice'

type Props = {
  open: boolean
  multi?: boolean
  onClose: () => void
  task: DBTask
}

const CompleteTaskModal = ({ open, onClose, task, multi }: Props) => {
  const dispatch = useAppDispatch()

  const { user } = useAppSelector((state) => state.auth)

  const privateRoute = usePrivateRoute()

  if (!open) return null

  const submit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (multi) {
      dispatch(completeTask({ privateRoute, taskId: task._id, multi }))
      dispatch(
        createNotification({
          privateRoute,
          taskCreated: false,
          userId: user._id,
        })
      )
    } else {
      dispatch(completeTask({ privateRoute, taskId: task._id }))
    }
  }

  return ReactDOM.createPortal(
    <>
      <div className='overlay' onClick={onClose} />
      <div className='modal'>
        <div>
          <h1 className='font-bold text-4xl text-pb my-10'>Complete task</h1>
        </div>
        <form>
          <div>
            <div>
              <label>Title</label>
            </div>
            <input type='text' value={task.title} readOnly />
          </div>
          <div>
            <div>
              <label>
                <h1>Description</h1>
              </label>
            </div>
            <textarea value={task.description} readOnly />
          </div>
          <div>
            <div>
              <label>Location</label>
            </div>
            <input type='text' value={task.location} readOnly />
          </div>
        </form>
        <section className='modal-btn'>
          <button className='reject-button' onClick={onClose}>
            Close
          </button>
          <button className='confirm-button' onClick={submit}>
            Complete
          </button>
        </section>
      </div>
    </>,
    document.getElementById('portal')!
  )
}

export default CompleteTaskModal
