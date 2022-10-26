import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <div className={styles.wrapper}>
      <ul>
        <li>
          <Link to='/homepage' style={{ color: '#fff', marginRight: 15 }}>
            Homepage
          </Link>
          <Link to='/assign-tasks' style={{ color: '#fff', marginRight: 15 }}>
            Assign Tasks
          </Link>
          <Link to='/tasks' style={{ color: '#fff', marginRight: 15 }}>
            Employee Tasks
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
