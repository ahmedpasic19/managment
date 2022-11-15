import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout } from '../../features/auth/authSlice'
import styles from './Navbar.module.css'
import { MouseEvent } from 'react'

const Navbar = () => {
  const dispatch = useAppDispatch()

  const { userType } = useAppSelector((state) => state.auth)

  const navigate = useNavigate()

  const location = useLocation()

  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(logout())
    navigate('/', { replace: true })
  }

  return (
    <div className={styles.wrapper}>
      <ul>
        {userType !== '' && (
          <Link
            to='/homepage'
            style={{ color: '#fff', marginRight: 15 }}
            replace
            state={{ from: location }}
          >
            Homepage
          </Link>
        )}
        {userType === 'admin' && (
          <Link
            to='/employees'
            style={{ color: '#fff', marginRight: 15 }}
            replace
            state={{ from: location }}
          >
            All employees
          </Link>
        )}
        {userType === 'employee' && (
          <Link
            to='/my-tasks'
            style={{ color: '#fff', marginRight: 15 }}
            replace
            state={{ from: location }}
          >
            Employee Tasks
          </Link>
        )}
        {userType === 'admin' && (
          <Link
            to='/tasks'
            style={{ color: '#fff', marginRight: 15 }}
            replace
            state={{ from: location }}
          >
            All tasks
          </Link>
        )}
        {userType === 'admin' && (
          <Link
            to='/completed-tasks'
            style={{ color: '#fff', marginRight: 15 }}
            replace
            state={{ from: location }}
          >
            Completed tasks
          </Link>
        )}
        {userType === '' && (
          <Link
            to='/'
            style={{ color: '#fff', marginRight: 15 }}
            replace
            state={{ from: location }}
          >
            Login
          </Link>
        )}
        {userType === '' && (
          <Link
            to='/register'
            style={{ color: '#fff', marginRight: 15 }}
            replace
            state={{ from: location }}
          >
            Register
          </Link>
        )}
        {userType !== '' && <button onClick={handleLogout}>Logout</button>}
      </ul>
    </div>
  )
}

export default Navbar
