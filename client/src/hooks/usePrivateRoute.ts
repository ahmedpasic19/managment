import { axiosPrivate } from '../api/axios'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { refreshToken } from '../features/auth/authSlice'

const usePrivateRoute = () => {
  const { accessToken } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config: any) => {
        if (config.headers) {
          if (!config.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
          }
        }
        return config
      },
      (error: any) => {
        Promise.reject(error)
      }
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        const prevReq = error?.config

        if (error?.response?.status === 403 && !prevReq?._retry) {
          prevReq._retry = true
          await dispatch(refreshToken())
          return axiosPrivate({
            ...prevReq,
            headers: {
              ...prevReq.headers,
              Authorization: `Bearer ${accessToken}`,
            },
            sent: true,
          })
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [accessToken, refreshToken])

  return axiosPrivate
}

export default usePrivateRoute
