import React from 'react'
import { BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { selectUserName } from '../../redux/authSlice'
import { Logout } from '../hiddenlinks'



const ANavbar = ({OpenSidebar}) => {
    const username=useSelector(selectUserName)
    return (
      <>
      <header className='header'>
          <div className='menu-icon'>
              <BsJustify className='icon' onClick={OpenSidebar}/>
          </div>
          <div className='header-left'>
              <BsSearch  className='icon'/>
          </div>
          <div className='header-right'>
              <BsPersonCircle className='icon'/><label className='icon'>Welcome {username}</label>
                <span className='icon' style={{cursor:'pointer'}}><Logout /></span>
          </div>
      </header>
      </>
    )
  
}

export default ANavbar
