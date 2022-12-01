import { ReactNode } from 'react'
import { useAppSelector } from '../../app/hooks'
import ButtonClearNotifications from './ButtonClearAllNotifications'

type Props = {
  children: ReactNode
}

const NotificationList = ({ children }: Props) => {
  const { notifications } = useAppSelector((state) => state.notifications)

  return (
    <ul className='mt-10 flex flex-col h-fit justify-evenly'>
      {notifications.length > 0 && <ButtonClearNotifications />}
      {children}
    </ul>
  )
}

export default NotificationList
