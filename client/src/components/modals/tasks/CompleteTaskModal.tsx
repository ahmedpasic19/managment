import ReactDOM from 'react-dom'
import styles from './AssignTaskModal.module.css'
import { completeTask, DBTask } from '../../../features/tasks/taskSlice'
import { MouseEvent } from 'react'
import { useAppDispatch } from '../../../app/hooks'
import { AsyncThunk } from '@reduxjs/toolkit'
import usePrivateRoute from '../../../hooks/usePrivateRoute'
import { AxiosInstance } from 'axios'

type Props = {
  open: boolean
  multi?: boolean
  onClose: () => void
  task: DBTask
}

const CompleteTaskModal = ({ open, onClose, task, multi }: Props) => {
  const dispatch = useAppDispatch()

  const privateRoute = usePrivateRoute()

  if (!open) return null

  const submit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (multi) {
      dispatch(completeTask({ privateRoute, taskId: task._id, multi }))
    } else {
      dispatch(completeTask({ privateRoute, taskId: task._id }))
    }
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <form>
          <input type='text' value={task.title} readOnly />
          <textarea value={task.description} readOnly />
          <input type='text' value={task.location} readOnly />
        </form>
        <section className='modal-btn'>
          <button onClick={submit}>Complete</button>
          <button onClick={onClose}>Close</button>
        </section>
      </div>
    </>,
    document.getElementById('portal')!
  )
}

export default CompleteTaskModal
