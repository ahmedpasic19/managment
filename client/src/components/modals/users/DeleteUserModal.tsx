import ReactDOM from 'react-dom'
import styles from './AssignTaskModal.module.css'
import { MouseEvent } from 'react'
import { useAppDispatch } from '../../../app/hooks'
import usePrivateRoute from '../../../hooks/usePrivateRoute'
import { deleteUser } from '../../../features/users/userSlice'

type Props = {
  open: boolean
  onClose: () => void
  userId: string
}

const DeleteUserModal = ({ open, onClose, userId }: Props) => {
  const dispatch = useAppDispatch()

  const privateRoute = usePrivateRoute()

  if (!open) return null

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(deleteUser({ userId, privateRoute }))
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
