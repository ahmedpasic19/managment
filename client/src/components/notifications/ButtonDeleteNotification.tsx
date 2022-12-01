import { useAppDispatch } from '../../app/hooks'
import { MouseEvent } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { deleteNotification } from '../../features/notifications/notificationsSlice'
import usePrivateRoute from '../../hooks/usePrivateRoute'

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  notificationId: string
}

const ButtonDeleteNotification = ({ notificationId, ...rest }: Props) => {
  const dispatch = useAppDispatch()

  const privateRoute = usePrivateRoute()

  const clearNotification = (e: MouseEvent) => {
    e.preventDefault()
    dispatch(deleteNotification({ notificationId, privateRoute }))
  }

  return (
    <button onClick={clearNotification} {...rest}>
      <CloseIcon />
    </button>
  )
}

export default ButtonDeleteNotification
