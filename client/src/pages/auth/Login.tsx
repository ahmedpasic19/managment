import { Link, useNavigate } from 'react-router-dom'
import { FormEvent, useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { loginUser } from '../../features/auth/authSlice'
import {
  setSuccessMessage,
  setErrorMessage,
} from '../../features/auth/authSlice'

type User = {
  email: string
  password: string
}
const Login = () => {
  const [userData, setUserData] = useState<User>({} as User)

  const { successMessage, errorMessage, isSuccess, isError } = useAppSelector(
    (state) => state.auth
  )

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  //Toast's
  const error = (msg: string) => {
    toast.error(msg, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnHover: false,
    })
  }
  const success = (msg: string) => {
    toast.success(msg, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnHover: false,
    })
  }
  const fields = () => {
    toast.error('Input all fileds', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnHover: false,
    })
  }

  useEffect(() => {
    //Toastify alerts
    if (successMessage) {
      success(successMessage)
      dispatch(setSuccessMessage(''))
      setUserData({} as User)
      navigate('/homepage', { replace: true })
      return
    }
    if (errorMessage) {
      error(errorMessage)
      dispatch(setErrorMessage(''))
      return
    }
  }, [isError, isSuccess, successMessage, setErrorMessage])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUserData({ ...userData, ...{ [e.target.name]: value } })
  }

  const handleSignIn = (e: FormEvent) => {
    e.preventDefault()
    //Checking if userData has all fields
    if (!userData.email || !userData.password) {
      //Return tostify message
      return fields()
    }
    dispatch(loginUser(userData))
  }

  return (
    <div className='login-container'>
      <ToastContainer />
      <form className='login-form'>
        <nav>
          <h1>Sign in</h1>
        </nav>
        <div>
          <div>
            <label htmlFor='email'>Email</label>
          </div>
        </div>
        <div className='mb-5'>
          <div>
            <input
              type='text'
              name='email'
              value={userData.email || ''}
              id='email'
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor='password'>Password</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type='password'
              name='password'
              value={userData.password || ''}
              id='password'
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <button onClick={handleSignIn}>Sign in</button>
        </div>
        <section>
          <div>
            <Link to='/register'>Don't have an accont?</Link>
          </div>
        </section>
      </form>
    </div>
  )
}

export default Login
