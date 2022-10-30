import ReactDOM from 'react-dom'
import styles from './AssignTaskModal.module.css'
import { MouseEvent } from 'react'
import { AsyncThunk } from '@reduxjs/toolkit'
import { useAppDispatch } from '../../../app/hooks'

type Props = {
  open: boolean
  onClose: () => void
  taskId: string
  multi?: boolean
  deleteTask: AsyncThunk<
    void,
    { taskId: string; multi?: boolean | undefined },
    {}
  >
}

const DeleteTaskModal = ({
  open,
  onClose,
  taskId,
  deleteTask,
  multi,
}: Props) => {
  const dispatch = useAppDispatch()

  if (!open) return null

  const submit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (multi) {
      dispatch(deleteTask({ taskId, multi }))
    } else {
      dispatch(deleteTask({ taskId }))
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
