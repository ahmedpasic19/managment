import useNotifications from '../../components/notifications/hooks/useNotifications'
import Notification from '../../components/notifications/Notification'
import NotificationList from '../../components/notifications/NotificationList'

const HomePage = () => {
  const notification = useNotifications()
  return (
    <div>
      <NotificationList>
        {notification.map((notification) => (
          <Notification notification={notification} />
        ))}
      </NotificationList>
    </div>
  )
}

export default HomePage
