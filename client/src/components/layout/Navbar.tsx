import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
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
        <Link to='/' style={{ color: '#fff', marginRight: 15 }}>
          Login
        </Link>
        <Link to='/register' style={{ color: '#fff', marginRight: 15 }}>
          Register
        </Link>
      </ul>
    </div>
  )
}

export default Navbar
