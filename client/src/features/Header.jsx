import React, { useContext, useEffect, useState } from 'react'
import { Button, NavDropdown,Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaLock, FaPenAlt, FaShoppingCart } from "react-icons/fa";
import { FaPen } from 'react-icons/fa6';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Logout, ShowOnLogin, ShowOnLogout } from './hiddenlinks';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { LogInUser, LogoutUser, selectUserName } from '../redux/authSlice';
import { selectCart } from '../redux/cartSlice';
import { FILTER_BY_SEARCH } from '../redux/filterSlice';
import useFetchCollection from '../customhook/useFetchCollection';
const Header = () => {
 const navigate=useNavigate()
 const dispatch=useDispatch()

  useEffect(()=>{
    onAuthStateChanged(auth, async(user) => {
      if (user) {
           const uid = user.uid;
           const docRef = doc(db,"users",uid)
           const docSnap = await getDoc(docRef)
           let obj={email:docSnap.data().email , name:docSnap.data().username , id :uid , role:docSnap.data().role}
          dispatch(LogInUser(obj))
      } else {
          dispatch(LogoutUser())
       }
    });
  },[auth])
 const username = useSelector(selectUserName)

 const cart = useSelector(selectCart)

 //search
 const [search,setSearch]=useState('')
 const {data:products}=useFetchCollection("products")
 useEffect(()=>{
  dispatch(FILTER_BY_SEARCH({products,search}))
  if(search !='')
      navigate('/products')
 },[search])
  return (  
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#">mini pro</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={NavLink}  style={({ isActive}) => {
                return {
                fontWeight: isActive ? "bold" : "", color: isActive ? "red" : "white",
                }}}  to='/'>Home</Nav.Link>
            <Nav.Link  as={NavLink}  style={({ isActive}) => {
                return {
                fontWeight: isActive ? "bold" : "", color: isActive ? "red" : "white",
                }}}  to='/products'>Products</Nav.Link>
          </Nav>
                <Form className='me-2'>
                <Form.Control placeholder='search by name and category' name="search"
                value={search} onChange={(e)=>setSearch(e.target.value)}></Form.Control>

                </Form>
          
          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link  as={Link} to='/cart'><FaShoppingCart size={30}/>
            <span class="badge rounded-pill text-bg-primary">{cart.length}</span >
            
            </Nav.Link>

                <ShowOnLogout>
                <Nav.Link  as={NavLink}  style={({ isActive}) => {
                    return {
                    fontWeight: isActive ? "bold" : "", color: isActive ? "red" : "white",
                    }}}  to='/register'><FaPenAlt/> Register</Nav.Link>
                <Nav.Link  as={NavLink}  style={({ isActive}) => {
                    return {
                    fontWeight: isActive ? "bold" : "", color: isActive ? "red" : "white",
                    backgroundColor:isActive ? "yellow":''
                    }}}  to='/login'><FaLock/> Login</Nav.Link>
                </ShowOnLogout>
                <ShowOnLogin>                 
                    <Nav.Link style={{color:'white'}}>Welcome {username}</Nav.Link>
                    <Nav.Link as={NavLink}  style={({ isActive}) => {
                    return {
                    fontWeight: isActive ? "bold" : "", color: isActive ? "red" : "white",
                    backgroundColor:isActive ? "yellow":''
                    }}}  to='/myorders'>My Orders</Nav.Link>
                    <Nav.Link  style={{color:'white'}}>
                      <Logout></Logout>
                    </Nav.Link>
                </ShowOnLogin>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
