import { Dispatch,SetStateAction } from "react";

type props = {
  setOpenSidebar: Dispatch<SetStateAction<boolean>>
  openSidebar: boolean
}

const Overlay = ({openSidebar,setOpenSidebar}:props) => {
  return (
    <div
    onClick={() => setOpenSidebar(false)}
      className='w-full h-full bg-black opacity-80 absolute top-0 left-0'
      style={{ zIndex: 90 }}
    ></div>
  )
}

export default Overlay
