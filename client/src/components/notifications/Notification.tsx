import { TDBNotification } from '../../features/notifications/notificationsSlice'
import { Link } from 'react-router-dom'
import ButtonDeleteNotification from './ButtonDeleteNotification'

type props = {
  notification: TDBNotification
}

const Notification = ({ notification }: props) => {
  return (
    <div className='bg-pg w-[300px] h-[150px] mb-5'>
      <div className='mt-3 w-full flex justify-end items-end'>
        <ButtonDeleteNotification
          notificationId={notification._id}
          className='mr-5 text-white outline-none'
        />
      </div>
      <h3 className='w-full text-center text-xl text-pb font-bold'>
        {notification.title}
      </h3>
      <div className='flex w-full justify-center items-center'>
        <Link
          to={
            notification.description === 'View completed task'
              ? '/completed-tasks'
              : '/my-tasks'
          }
          className='mt-5 text-lg text-pb font-semibold cursor-pointer hover:underline hover:underline-offset-3'
        >
          {notification.description}
        </Link>
      </div>
    </div>
  )
}

export default Notification
