import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'

export const ProtectAdmin = () => {
  const { userType } = useAppSelector((state) => state.auth)

  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  return userType !== 'admin' ? (
    <Navigate to={from} state={{ from: location }} replace={true} />
  ) : (
    <Outlet />
  )
}

export const ProtectedRoute = () => {
  const { userType } = useAppSelector((state) => state.auth)

  const location = useLocation()

  return userType === '' ? (
    <Navigate to='/' state={{ from: location }} replace={true} />
  ) : (
    <Outlet />
  )
}

export const ProtectAuth = () => {
  const { userType } = useAppSelector((state) => state.auth)

  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  return userType !== '' ? (
    <Navigate
      to={from === '/' ? '/homepage' : from}
      state={{ from: location }}
      replace={true}
    />
  ) : (
    <Outlet />
  )
}
