import ReactDOM from 'react-dom'
import styles from './AssignTaskModal.module.css'
import { ChangeEvent, MouseEvent } from 'react'
import { useAppDispatch } from '../../../app/hooks'
import { DBUser, editUser } from '../../../features/users/userSlice'
import { toast } from 'react-toastify'
import usePrivateRoute from '../../../hooks/usePrivateRoute'

type Props = {
  open: boolean
  onClose: () => void
  user: DBUser
  setUser: (value: DBUser) => void
}

const EditUserModal = ({ open, onClose, user, setUser }: Props) => {
  const dispatch = useAppDispatch()

  const privateRoute = usePrivateRoute()

  if (!open) return null

  const shortPassword = () => {
    toast.success('Password must contain at least 8 ASCII characters', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      pauseOnHover: false,
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    setUser({ ...user, ...{ [e.target.name]: value } })
  }

  const submit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (user.password?.length < 8) return shortPassword()
    dispatch(editUser({ userData: user, privateRoute }))
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <span>
          <h3>Edit user</h3>
        </span>
        <form action=''>
          <div>
            <label>Email</label>
            <input
              type='text'
              defaultValue={user.email}
              name='email'
              onChange={handleChange}
            />
          </div>
          <div>
            <label>First name</label>
            <input
              type='text'
              defaultValue={user.firstName}
              name='firstName'
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Last name</label>
            <input
              type='text'
              defaultValue={user.lastName}
              name='lastName'
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Phone number</label>
            <input
              type='number'
              defaultValue={user.phoneNumber}
              name='phoneNumber'
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type='password'
              placeholder='Password...'
              name='password'
              onChange={handleChange}
            />
          </div>
          <div>
            <label>User type</label>
            <select name='process'>
              <option value='awaiting'>Awaiting</option>
              <option value='process'>Working on it</option>
              <option value='completed'>Completed</option>
            </select>
          </div>
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

export default EditUserModal
