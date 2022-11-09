import { axiosPrivate } from '../api/axios'
import { useEffect } from 'react'
import { useAppSelector } from '../app/hooks'
import { refreshToken } from '../features/auth/authSlice'
import { useRefreshToken } from './useRefreshToken'

const usePrivateRoute = () => {
  const { accessToken } = useAppSelector((state) => state.auth)

  const refresh = useRefreshToken()

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
          const newAccessToken = await refresh()
          return axiosPrivate({
            ...prevReq,
            headers: {
              ...prevReq.headers,
              Authorization: `Bearer ${newAccessToken}`,
            },
            sent: true,
          })
        } else {
          return Promise.reject(error)
        }
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
