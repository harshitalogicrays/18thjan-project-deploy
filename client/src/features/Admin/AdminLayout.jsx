import React, { useState } from 'react'
import ANavbar from './ANavbar'
import ASidebar from './ASidebar'
import './AdminLayout.css'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const AdminLayout = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <>
     <ToastContainer
      position="top-left"
      autoClose={2000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />
   
     <div className='grid-container'>
        <ANavbar OpenSidebar={OpenSidebar}/>
        <ASidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <Outlet/>
     </div>
 </>
  )
}

export default AdminLayout
