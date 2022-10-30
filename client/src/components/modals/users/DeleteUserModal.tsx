import ReactDOM from 'react-dom'
import styles from './AssignTaskModal.module.css'
import { MouseEvent } from 'react'
import { AsyncThunk } from '@reduxjs/toolkit'
import { useAppDispatch } from '../../../app/hooks'

type Props = {
  open: boolean
  onClose: () => void
  userId: string
  deleteUser: AsyncThunk<void, string, {}>
}

const DeleteUserModal = ({ open, onClose, userId, deleteUser }: Props) => {
  const dispatch = useAppDispatch()

  if (!open) return null

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(deleteUser(userId))
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <span>
          <h3>Do you want to delete this employee?</h3>
        </span>
        <div>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>,
    document.getElementById('portal')!
  )
}

export default DeleteUserModal
