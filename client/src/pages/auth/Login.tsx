import { Link, useNavigate } from 'react-router-dom'
import { FormEvent, useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import styles from './Login.module.css'
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
    <div className={styles['login-container']}>
      <ToastContainer />
      <form className={styles['login-form']}>
        <h1>Sign in</h1>
        <div>
          <label htmlFor='email'>Email</label>
        </div>
        <input
          type='text'
          name='email'
          value={userData.email || ''}
          id='email'
          onChange={handleChange}
        />
        <div>
          <label htmlFor='password'>Password</label>
        </div>
        <input
          type='password'
          name='password'
          value={userData.password || ''}
          id='password'
          onChange={handleChange}
        />
        <button onClick={handleSignIn}>Sign in</button>
        <section>
          <Link to='/register'>Don't have an accont?</Link>
          <label htmlFor='rememberMe'>
            Remember me
            <label htmlFor='rememberMe' className={styles['round']}>
              <input
                type='checkbox'
                name=''
                id='rememberMe'
                className={styles['checkbox']}
              />
            </label>
          </label>
        </section>
      </form>
    </div>
  )
}

export default Login
