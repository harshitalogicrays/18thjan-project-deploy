import React from 'react'
import { Image } from 'react-bootstrap'
import image1 from '/src/assets/images/d.jpg'
import 
{ BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill,BsFillGearFill,
  BsImages,BsPersonFillAdd} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { BiSolidShoppingBags } from 'react-icons/bi'
const ASidebar =  ({openSidebarToggle,OpenSidebar}) => {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
          <div className='sidebar-title'>
              <div className='sidebar-brand'>
                  <Image  className='icon_header' src={image1} height={40} width={40}/> SHOP
              </div>
              <span className='icon close_icon' onClick={OpenSidebar}>X</span>
          </div>
  
          <ul className='sidebar-list'>
              <li className='sidebar-list-item'>
                  <a href="">
                     <Link className='link' to='/admin'> <BsGrid1X2Fill className='icon'/> Dashboard
                     </Link>
                  </a>
              </li>
              <li className='sidebar-list-item'>
                  <a href="">
                  <Link className='link' to='/admin/viewcategory'>    <BsFillGrid3X3GapFill className='icon'/> Categories</Link>
                  </a>
              </li>
              <li className='sidebar-list-item'>
                  <a href="">
                  <Link className='link' to='/admin/viewproduct'>   <BsFillArchiveFill className='icon'/> Products</Link>
                  </a>
              </li>
             
              <li className='sidebar-list-item'>
                  <a href="">
                  <Link className='link' to='/admin/viewslider'>  <BsImages className='icon'/> Slider</Link>
                  </a>
              </li>
              <li className='sidebar-list-item'>
                  <a href="">
                  <Link className='link' to='/admin'>   <BsPersonFillAdd className='icon'/> Users</Link>
                  </a>
              </li>
              <li className='sidebar-list-item'>
                  <a href="">
                  <Link className='link' to='/admin/orders'>   <BiSolidShoppingBags className='icon'/> Orders</Link>
                  </a>
              </li>
              <li className='sidebar-list-item'>
                  <a href="">
                  <Link className='link' to='/admin'>   <BsFillGearFill className='icon'/> Setting</Link>
                  </a>
              </li>
          </ul>
      </aside>
    )
}

export default ASidebar
