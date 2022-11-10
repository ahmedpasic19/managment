import ReactDOM from 'react-dom'
import styles from './AssignTaskModal.module.css'
import { MouseEvent } from 'react'
import { AsyncThunk } from '@reduxjs/toolkit'
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
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <span>
          <h3>Do you want to delete this task?</h3>
        </span>
        <div>
          <button onClick={submit}>Delete</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>,
    document.getElementById('portal')!
  )
}

export default DeleteTaskModal
