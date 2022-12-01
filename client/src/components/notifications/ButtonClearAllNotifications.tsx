import { useAppDispatch } from '../../app/hooks'
import { MouseEvent } from 'react'
import {
  deleteAllNotifications,
  getNotifications,
} from '../../features/notifications/notificationsSlice'
import CloseIcon from '@mui/icons-material/Close'
import usePrivateRoute from '../../hooks/usePrivateRoute'

const ButtonClearNotifications = () => {
  const dispatch = useAppDispatch()

  const privateRoute = usePrivateRoute()

  const clearNotifications = (e: MouseEvent) => {
    e.preventDefault()
    dispatch(deleteAllNotifications(privateRoute))
    dispatch(getNotifications(privateRoute))
  }

  return (
    <div className='w-full flex justify-end items-end mb-2'>
      <button
        className='px-4 py-2 rounded-xl bg-pg text-white font-bold text-2xl flex items-center'
        onClick={clearNotifications}
      >
        <p className='mb-0 mr-2'>Clear</p>{' '}
        <CloseIcon className='text-white mt-2' />
      </button>
    </div>
  )
}

export default ButtonClearNotifications
