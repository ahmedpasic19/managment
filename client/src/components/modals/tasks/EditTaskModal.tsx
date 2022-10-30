import ReactDOM from 'react-dom'
import styles from './AssignTaskModal.module.css'
import { ChangeEvent, MouseEvent } from 'react'
import { DBTask } from '../../../features/tasks/taskSlice'
import { AsyncThunk } from '@reduxjs/toolkit'
import { useAppDispatch } from '../../../app/hooks'

type Props = {
  open: boolean
  onClose: () => void
  task: DBTask
  editTask: AsyncThunk<
    void,
    { taskData: DBTask; multi?: boolean | undefined },
    {}
  >
  setTask: (value: DBTask) => void
  employeeEdit?: boolean | string
  multi?: boolean
}

const EditTaskModal = ({
  open,
  onClose,
  task,
  employeeEdit,
  editTask,
  setTask,
  multi,
}: Props) => {
  const dispatch = useAppDispatch()

  if (!open) return null

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    setTask({ ...task, ...{ [e.target.name]: value } })
  }

  const submit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (
      task.location !== '' ||
      task.description !== '' ||
      task.assignedTo !== '' ||
      task.compleatedAt !== ''
    )
      if (multi) {
        dispatch(editTask({ taskData: task, multi }))
      } else {
        dispatch(editTask({ taskData: task }))
      }
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <span>
          <h3>Edit task</h3>
        </span>
        <form action=''>
          <div>
            <label>Title</label>
            <input
              type='text'
              defaultValue={task.title}
              name='title'
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type='text'
              defaultValue={task.description}
              name='description'
              onChange={handleChange}
            />
          </div>
          {employeeEdit === false || !!employeeEdit ? (
            <div>
              <label>Location</label>
              <input
                type='text'
                defaultValue={task.location}
                name='location'
                onChange={handleChange}
              />
            </div>
          ) : null}
          <div>
            <label>Progress status</label>
            <select name='process'>
              <option value='awaiting'>Awaiting</option>
              <option value='process'>Working on it</option>
              <option value='completed'>Completed</option>
            </select>
          </div>
          {/* Select user to re-assign to */}
          {/* {
            <div>
              <label>Assigned to</label>
              <select>
                <option value='awaiting'>Awaiting</option>
                <option value='process'>Working on it</option>
                <option value='completed'>Completed</option>
              </select>
            </div>
          } */}
        </form>
        <div>
          <button onClick={submit}>Save</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>,
    document.getElementById('portal')!
  )
}

export default EditTaskModal
