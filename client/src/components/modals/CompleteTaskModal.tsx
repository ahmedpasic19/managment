import ReactDOM from 'react-dom'
import styles from './AssignTaskModal.module.css'
import { toast } from 'react-toastify'
import { DBTask } from '../../features/tasks/taskSlice'

type Props = {
  open: boolean
  onClose: () => void
  task: DBTask
}

const CompleteTaskModal = ({ open, onClose, task }: Props) => {
  if (!open) return null

  //Toasts
  const fields = () => {
    toast.error('Input all fileds', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnHover: false,
    })
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <form action=''>
          <div>
            <label>Progress</label>
            <input type='text' name='Progress' />
          </div>
          <div>
            <label htmlFor='compleated'>Compleated</label>
            <input type='checkbos' name='compleated' id='compleated' />
          </div>
        </form>
        <section className='modal-btn'>
          <button>Save</button>
          <button onClick={onClose}>Close</button>
        </section>
      </div>
    </>,
    document.getElementById('portal')!
  )
}

export default CompleteTaskModal
