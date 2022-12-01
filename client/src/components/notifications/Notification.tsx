import { TNotification } from '../../features/notifications/notificationsSlice'

type props = {
  notification: TNotification
}

const Notification = ({ notification }: props) => {
  return (
    <div className='bg-pg w-[300px] h-[150px]'>
      <h3>{notification.title}</h3>
      <p>{notification.description}</p>
    </div>
  )
}

export default Notification
