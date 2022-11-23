import ReactDOM from 'react-dom'
import { MouseEvent } from 'react'
import { useAppDispatch } from '../../../app/hooks'
import usePrivateRoute from '../../../hooks/usePrivateRoute'
import { deleteUser } from '../../../features/users/userSlice'

type Props = {
  open: boolean
  onClose: () => void
  userId: string
}

const DeleteUserModal = ({ open, onClose, userId }: Props) => {
  const dispatch = useAppDispatch()

  const privateRoute = usePrivateRoute()

  if (!open) return null

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(deleteUser({ userId, privateRoute }))
  }

  return ReactDOM.createPortal(
    <>
      <div className='overlay' onClick={onClose} />
      <div className='delete-modal'>
        <div>
          <h1 className='font-bold text-4xl text-pb text-center my-10'>
            Do you want to delete this employee?
          </h1>
        </div>
        <section>
          <button className='reject-button' onClick={onClose}>
            Close
          </button>
          <button className='confirm-button' onClick={handleDelete}>
            Delete
          </button>
        </section>
      </div>
    </>,
    document.getElementById('portal')!
  )
}

export default DeleteUserModal
