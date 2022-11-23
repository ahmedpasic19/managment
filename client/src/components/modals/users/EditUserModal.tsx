import ReactDOM from 'react-dom'
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
      <div className='overlay' onClick={onClose} />
      <div className='modal'>
        <div>
          <h1 className='font-bold text-4xl text-pb my-10'>Edit user</h1>
        </div>
        <form action=''>
          <div>
            <div>
              <label>Email</label>
            </div>
            <input
              type='text'
              defaultValue={user.email}
              name='email'
              onChange={handleChange}
            />
          </div>
          <div>
            <div>
              <label>First name</label>
            </div>
            <input
              type='text'
              defaultValue={user.firstName}
              name='firstName'
              onChange={handleChange}
            />
          </div>
          <div>
            <div>
              <label>Last name</label>
            </div>
            <input
              type='text'
              defaultValue={user.lastName}
              name='lastName'
              onChange={handleChange}
            />
          </div>
          <div>
            <div>
              <label>Phone number</label>
            </div>
            <input
              type='number'
              defaultValue={user.phoneNumber}
              name='phoneNumber'
              onChange={handleChange}
            />
          </div>
          <div>
            <div>
              <label>Password</label>
            </div>
            <input
              type='password'
              placeholder='Password...'
              name='password'
              onChange={handleChange}
            />
          </div>
          <div>
            <div>
              <label>User type</label>
            </div>
            <select name='process'>
              <option value='admin'>Admin</option>
              <option value='employee'>Employee</option>
            </select>
          </div>
        </form>
        <section>
          <button className='reject-button' onClick={onClose}>
            Close
          </button>
          <button className='confirm-button' onClick={submit}>
            Save
          </button>
        </section>
      </div>
    </>,
    document.getElementById('portal')!
  )
}

export default EditUserModal
