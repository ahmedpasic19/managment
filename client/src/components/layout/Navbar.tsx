import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout } from '../../features/auth/authSlice'
import LogoutIcon from '@mui/icons-material/Logout'
import CloseIcon from '@mui/icons-material/Close'
import { MouseEvent, useState, useEffect } from 'react'

const Navbar = () => {
  const dispatch = useAppDispatch()

  const { userType } = useAppSelector((state) => state.auth)

  const [openSidebar, setOpenSidebar] = useState(false)

  const navigate = useNavigate()

  const location = useLocation()

  useEffect(() => {
    if (userType === '') {
      navigate('/', { replace: true })
    }
  }, [userType])

  const handleLogout = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    dispatch(logout())
  }

  return (
    <div className='navbar-wrapper'>
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
          {userType === 'admin' && (
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
              Register user
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
