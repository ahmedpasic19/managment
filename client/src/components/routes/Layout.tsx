import { Outlet } from 'react-router-dom'
import Navbar from '../layout/Navbar'

const Layout = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout
