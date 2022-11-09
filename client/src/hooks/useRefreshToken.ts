import axios from 'axios'
import { useAppDispatch } from '../app/hooks'
import { setAccessToken } from '../features/auth/authSlice'

export const useRefreshToken = () => {
  const dispatch = useAppDispatch()

  const refresh = async () => {
    const response = await axios.get('/refresh', { withCredentials: true })
    if (response) {
      dispatch(setAccessToken(response.data.accessToken))
      return response.data.accessToken
    }
  }
  return refresh
}
