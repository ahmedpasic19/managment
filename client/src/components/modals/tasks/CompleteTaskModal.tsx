import ReactDOM from 'react-dom'
import styles from './AssignTaskModal.module.css'
import { DBTask } from '../../../features/tasks/taskSlice'
import { MouseEvent } from 'react'
import { useAppDispatch } from '../../../app/hooks'
import { AsyncThunk } from '@reduxjs/toolkit'

type Props = {
  open: boolean
  multi?: boolean
  onClose: () => void
  completeTask: AsyncThunk<
    void,
    { taskId: string; multi?: boolean | undefined },
    {}
  >
  task: DBTask
}

const CompleteTaskModal = ({
  open,
  onClose,
  task,
  completeTask,
  multi,
}: Props) => {
  const dispatch = useAppDispatch()

  if (!open) return null

  const submit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (multi) {
      dispatch(completeTask({ taskId: task._id, multi }))
    } else {
      dispatch(completeTask({ taskId: task._id }))
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
