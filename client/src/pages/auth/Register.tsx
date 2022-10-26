import Select, { StylesConfig } from 'react-select'
import styles from './Register.module.css'
import { registerUser } from '../../features/users/userSlice'
import { useState, FormEvent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  setSuccessMessage,
  setErrorMessage,
  setMessage,
} from '../../features/users/userSlice'
import { useNavigate } from 'react-router-dom'

type User = {
  firstName: string
  lastName: string
  password: string
  email: string
  phoneNumber: number
  userType: string
  refreshToken?: string
}

type Option = { value: string; label: string }

const Register = () => {
  //Options for react-select
  const options = [
    { value: 'employee', label: 'Employee' },
    { value: 'customer', label: 'Customer' },
  ]

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

  const [userType, setUserType] = useState<Option | null>()

  const {
    isError,
    isLoading,
    isSuccess,
    user,
    message,
    successMessage,
    errorMessage,
  } = useAppSelector((state) => state.users)

  useEffect(() => {
    //Toastify alerts
    if (isError && message) {
      error(message)
      dispatch(setMessage(''))
      return
    }
    //Clear state from form if user created
    if (successMessage) {
      success(successMessage)
      dispatch(setSuccessMessage(''))
      setUserData({} as User)
      navigate('/homepage')
      setUserType(null)
      return
    }
    if (errorMessage) {
      error(errorMessage)
      dispatch(setErrorMessage(''))
      return
    }
  }, [isError, isSuccess, message, successMessage, errorMessage])

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [userData, setUserData] = useState<User>({} as User)

  //Seperate onChange for react-select
  const onSelectChange = (option: Option | null) => {
    if (option) {
      let newUserData = { ...userData }
      newUserData.userType = option.value
      setUserData(newUserData)
      setUserType(option)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUserData({ ...userData, ...{ [e.target.name]: value } })
  }

  const handleRegister = (e: FormEvent) => {
    e.preventDefault()
    //Checking if userData has all fields
    if (
      !userData.email ||
      !userData.firstName ||
      !userData.lastName ||
      !userData.password ||
      !userData.phoneNumber ||
      !userData.userType
    ) {
      //Return tostify message
      return fields()
    }
    dispatch(registerUser(userData))
  }

  //Styles for react-select
  const customStyles: StylesConfig = {
    singleValue: (base) => ({
      ...base,
      width: 300,
    }),
    placeholder: (base) => {
      return {
        ...base,
        color: '#889cbe',
        width: 300,
      }
    },
  }

  return (
    <div className={styles['register-container']}>
      <ToastContainer />
      <form className={styles['register-form']}>
        <h1>Register</h1>
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
          <label htmlFor='firstName'>First name</label>
        </div>
        <input
          type='text'
          name='firstName'
          value={userData.firstName || ''}
          id='firstName'
          onChange={handleChange}
        />
        <div>
          <label htmlFor='lastName'>Last name</label>
        </div>
        <input
          type='text'
          name='lastName'
          value={userData.lastName || ''}
          id='lastName'
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
        <div>
          <label htmlFor='phoneNumber'>Phone number</label>
        </div>
        <input
          type='number'
          name='phoneNumber'
          value={userData.phoneNumber || ''}
          id='phoneNumber'
          onChange={handleChange}
        />
        <div>
          <label htmlFor='type'>Type of user?</label>
        </div>
        <Select
          options={options}
          id='type'
          styles={customStyles}
          value={userType || null}
          placeholder='User type...'
          onChange={(option) => {
            if (option) {
              onSelectChange(option as Option)
            }
          }}
        />
        <button onClick={handleRegister}>Register</button>
      </form>
    </div>
  )
}

export default Register
