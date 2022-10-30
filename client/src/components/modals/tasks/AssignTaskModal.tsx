import ReactDOM from 'react-dom'
import { ChangeEvent, MouseEvent } from 'react'
import styles from './AssignTaskModal.module.css'
import { AsyncThunk } from '@reduxjs/toolkit'
import { DBUser } from '../../../features/users/userSlice'
import { useAppDispatch } from '../../../app/hooks'
import { toast } from 'react-toastify'

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
  assignTask: AsyncThunk<any, Task, {}>
  user: DBUser
}

const AssignTskModal = ({
  open,
  onClose,
  newTask,
  setNewTask,
  assignTask,
  user,
}: Props) => {
  const dispatch = useAppDispatch()

  if (!open) return null

  const fields = () => {
    toast.error('Input all fileds', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      pauseOnHover: false,
    })
  }

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    let value = e.target.value
    let name = e.target.name
    let newObj = { ...newTask }
    newObj[name as 'location' | 'description' | 'location'] = value
    setNewTask(newObj)
  }

  const handleCreateTask = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    let keys = Object.values(newTask).every((key) => key.trim())
    if (!keys) return fields()
    if (keys)
      dispatch(
        assignTask({
          ...newTask,
          assignedAt: '12:00',
          assignedTo: user._id,
          username: user.firstName,
        })
      )
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
