import { useSelector } from "react-redux"
import { selectIsLoggedIn, selectUserRole } from "../redux/authSlice"
import { FaLock } from "react-icons/fa"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/config"
import { toast } from "react-toastify"
import { Navigate, useNavigate } from "react-router-dom"

export const ShowOnLogin=({children})=>{
   const isLoggedIn  = useSelector(selectIsLoggedIn)
   if(isLoggedIn)return children
   else return null
  }

export const ShowOnLogout=({children})=>{
  const isLoggedIn  = useSelector(selectIsLoggedIn)
  if(!isLoggedIn)return children
  else return null
  }

  export const Logout=(...props)=>{
    const navigate=useNavigate()
    let handleLogout=()=>{
      signOut(auth).then(() => {
        toast.success("loggedOut Successfully")
        navigate('/')
      }).catch((error) => {
       toast.error(error.message)
      }); 
    }
    return(
      <>
      <span onClick={handleLogout} {...props}><FaLock/> Logout</span>
      </>
    )
  }


  export const ProtectedAdmin=({children})=>{
    const isLoggedIn  = useSelector(selectIsLoggedIn)
    const role=useSelector(selectUserRole)
    if(isLoggedIn && role=='0') return children
    else return <Navigate to='/login' replace={true}/>
  }

  export const Protected=({children})=>{
    const isLoggedIn  = useSelector(selectIsLoggedIn)
    const role=useSelector(selectUserRole)
    if(isLoggedIn && role=='1') return children
    else return <Navigate to='/login' replace={true}/>
  }