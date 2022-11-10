import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { logout } from '../../features/auth/authSlice'
import styles from './Navbar.module.css'
import { MouseEvent } from 'react'

const Navbar = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(logout())
    navigate('/', { replace: true })
  }

  return (
    <div className={styles.wrapper}>
      <ul>
        <Link to='/homepage' style={{ color: '#fff', marginRight: 15 }}>
          Homepage
        </Link>
        <Link to='/employees' style={{ color: '#fff', marginRight: 15 }}>
          All employees
        </Link>
        <Link to='/my-tasks' style={{ color: '#fff', marginRight: 15 }}>
          Employee Tasks
        </Link>
        <Link to='/tasks' style={{ color: '#fff', marginRight: 15 }}>
          All tasks
        </Link>
        <Link to='/completed-tasks' style={{ color: '#fff', marginRight: 15 }}>
          Completed tasks
        </Link>
        <Link to='/' style={{ color: '#fff', marginRight: 15 }}>
          Login
        </Link>
        <Link to='/register' style={{ color: '#fff', marginRight: 15 }}>
          Register
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </ul>
    </div>
  )
}

export default Navbar
