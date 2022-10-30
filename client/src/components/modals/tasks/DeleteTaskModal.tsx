import ReactDOM from 'react-dom'
import styles from './AssignTaskModal.module.css'
import { MouseEvent } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  taskId: string
  deleteTask: (e: MouseEvent<HTMLButtonElement>) => void
}

const DeleteTaskModal = ({ open, onClose, taskId, deleteTask }: Props) => {
  if (!open) return null

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <span>
          <h3>Do you want to delete this task?</h3>
        </span>
        <div>
          <button onClick={deleteTask}>Delete</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>,
    document.getElementById('portal')!
  )
}

export default DeleteTaskModal
