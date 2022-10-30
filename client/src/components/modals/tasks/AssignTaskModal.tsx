import ReactDOM from 'react-dom'
import { ChangeEvent, MouseEvent } from 'react'
import styles from './AssignTaskModal.module.css'

type Task = {
  title: string
  description: string
  assignedTo: string
  assignedAt: string
  location: string
  username: string
}

type Props = {
  open: boolean
  onClose: () => void
  newTask: Task
  setNewTask: (value: Task) => void
  handleCreateTask: (e: MouseEvent<HTMLButtonElement>) => void
}

const AssignTskModal = ({
  open,
  onClose,
  newTask,
  setNewTask,
  handleCreateTask,
}: Props) => {
  if (!open) return null

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    let value = e.target.value
    let name = e.target.name
    let newObj = { ...newTask }
    newObj[name as 'location' | 'description' | 'location'] = value
    setNewTask(newObj)
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <form action=''>
          <div>
            <label>Title</label>
            <input type='text' name='title' onChange={handleOnchange} />
          </div>
          <div>
            <label>Description</label>
            <input type='text' name='description' onChange={handleOnchange} />
          </div>
          <div>
            <label>Location</label>
            <input type='text' name='location' onChange={handleOnchange} />
          </div>
        </form>
        <section className='modal-btn'>
          <button onClick={handleCreateTask}>Assign</button>
          <button onClick={onClose}>Close</button>
        </section>
      </div>
    </>,
    document.getElementById('portal')!
  )
}

export default AssignTskModal
