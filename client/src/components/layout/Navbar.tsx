import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout } from '../../features/auth/authSlice'
import LogoutIcon from '@mui/icons-material/Logout'
import CloseIcon from '@mui/icons-material/Close'
import { MouseEvent, useState } from 'react'

const Navbar = () => {
  const dispatch = useAppDispatch()

  const { userType } = useAppSelector((state) => state.auth)

  const [openSidebar, setOpenSidebar] = useState(false)

  const navigate = useNavigate()

  const location = useLocation()

  const handleLogout = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    dispatch(logout())
    navigate('/', { replace: true })
  }

  return (
    <div className='navbar-wrapper'>
      {/* <ul className='navbar'>
        <div className='hidden phone:block'>
          <h3>Tasker</h3>
        </div>
        {userType !== '' && (
          <Link
            className='phone:hidden'
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
            className='phone:hidden'
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
            className='phone:hidden'
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
            className='phone:hidden'
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
            className='phone:hidden'
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
            className='phone:hidden'
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
            className='phone:hidden'
            to='/register'
            style={{ color: '#fff', marginRight: 15 }}
            replace
            state={{ from: location }}
          >
            Register
          </Link>
        )}
        {userType !== '' && <button onClick={handleLogout}>Logout</button>}
      </ul> */}

      <div className='hamburger' onClick={() => setOpenSidebar(!openSidebar)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`sidebar ${openSidebar ? 'w-[250px]' : 'hidden'}`}>
        <button onClick={() => setOpenSidebar(!openSidebar)}>
          <CloseIcon />
        </button>
        <h1>Tasker</h1>
        <ul>
          {userType !== '' && (
            <Link
              to='/homepage'
              style={{
                color: '#fff',
                marginTop: 8,
                marginBottom: 8,
                padding: 2,
                borderColor: 'white',
                borderWidth: 1,
                borderRight: 0,
                borderLeft: 0,
                borderTop: 0,
              }}
              replace
              state={{ from: location }}
            >
              Homepage
            </Link>
          )}
          {userType === 'admin' && (
            <Link
              to='/employees'
              style={{
                color: '#fff',
                marginTop: 8,
                marginBottom: 8,
                padding: 2,
                borderColor: 'white',
                borderWidth: 1,
                borderRight: 0,
                borderLeft: 0,
                borderTop: 0,
              }}
              replace
              state={{ from: location }}
            >
              All employees
            </Link>
          )}
          {userType === 'employee' && (
            <Link
              to='/my-tasks'
              style={{
                color: '#fff',
                marginTop: 8,
                marginBottom: 8,
                padding: 2,
                borderColor: 'white',
                borderWidth: 1,
                borderRight: 0,
                borderLeft: 0,
                borderTop: 0,
              }}
              replace
              state={{ from: location }}
            >
              Employee Tasks
            </Link>
          )}
          {userType === 'admin' && (
            <Link
              to='/tasks'
              style={{
                color: '#fff',
                marginTop: 8,
                marginBottom: 8,
                padding: 2,
                borderColor: 'white',
                borderWidth: 1,
                borderRight: 0,
                borderLeft: 0,
                borderTop: 0,
              }}
              replace
              state={{ from: location }}
            >
              All tasks
            </Link>
          )}
          {userType === 'admin' && (
            <Link
              to='/completed-tasks'
              style={{
                color: '#fff',
                marginTop: 8,
                marginBottom: 8,
                padding: 2,
                borderColor: 'white',
                borderWidth: 1,
                borderRight: 0,
                borderLeft: 0,
                borderTop: 0,
              }}
              replace
              state={{ from: location }}
            >
              Completed tasks
            </Link>
          )}
          {userType === '' && (
            <Link
              to='/'
              style={{
                color: '#fff',
                marginTop: 8,
                marginBottom: 8,
                padding: 2,
                borderColor: 'white',
                borderWidth: 1,
                borderRight: 0,
                borderLeft: 0,
                borderTop: 0,
              }}
              replace
              state={{ from: location }}
            >
              Login
            </Link>
          )}
          {userType === '' && (
            <Link
              to='/register'
              style={{
                color: '#fff',
                marginTop: 8,
                marginBottom: 8,
                padding: 2,
                borderColor: 'white',
                borderWidth: 1,
                borderRight: 0,
                borderLeft: 0,
                borderTop: 0,
              }}
              replace
              state={{ from: location }}
            >
              Register
            </Link>
          )}
          {userType !== '' && (
            <div
              className='flex justify-evenly w-full items-center p-1 rounded-xl mt-3 bg-[#42F2F7] cursor-pointer'
              onClick={handleLogout}
            >
              <LogoutIcon
                style={{ height: '40px', width: '40px', color: '#4C5844' }}
              />
              <button>Logout</button>
            </div>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
