import useNotifications from '../../components/notifications/hooks/useNotifications'
import Notification from '../../components/notifications/Notification'

const HomePage = () => {
  const notification = useNotifications()
  return (
    <div>
      {notification.map((notification) => (
        <Notification notification={notification} />
      ))}
    </div>
  )
}

export default HomePage
