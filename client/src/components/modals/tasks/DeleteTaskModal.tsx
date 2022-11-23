import ReactDOM from 'react-dom'
import { MouseEvent } from 'react'
import { useAppDispatch } from '../../../app/hooks'
import usePrivateRoute from '../../../hooks/usePrivateRoute'
import { deleteTask } from '../../../features/tasks/taskSlice'

type Props = {
  open: boolean
  onClose: () => void
  taskId: string
  multi?: boolean
}

const DeleteTaskModal = ({ open, onClose, taskId, multi }: Props) => {
  const dispatch = useAppDispatch()

  const privateRoute = usePrivateRoute()

  if (!open) return null

  const submit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (multi) {
      dispatch(deleteTask({ privateRoute, taskId, multi }))
    } else {
      dispatch(deleteTask({ privateRoute, taskId }))
    }
  }

  return ReactDOM.createPortal(
    <>
      <div className='overlay' onClick={onClose} />
      <div className='delete-modal'>
        <div>
          <h1 className='font-bold text-center t-50 text-4xl text-pb my-10'>
            Do you want to delete this task?
          </h1>
        </div>
        <section>
          <button className='reject-button' onClick={onClose}>
            Close
          </button>
          <button className='confirm-button' onClick={submit}>
            Delete
          </button>
        </section>
      </div>
    </>,
    document.getElementById('portal')!
  )
}

export default DeleteTaskModal
