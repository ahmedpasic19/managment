import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getNotifications } from '../../../features/notifications/notificationsSlice'
import usePrivateRoute from '../../../hooks/usePrivateRoute'

const useNotifications = () => {
  const { notifications } = useAppSelector((state) => state.notifications)

  const dispatch = useAppDispatch()

  const privateRoute = usePrivateRoute()

  useEffect(() => {
    dispatch(getNotifications(privateRoute))
  }, [])
  return notifications
}

export default useNotifications
