import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../layout/Navbar'
import Overlay from '../layout/Overlay'

const Layout = () => {
  const [openSidebar, setOpenSidebar] = useState(false)

  return (
    <div className='flex flex-col justify-center items-center'>
      {openSidebar && (
        <Overlay setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
      )}
      <Navbar setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
      <Outlet />
    </div>
  )
}

export default Layout
