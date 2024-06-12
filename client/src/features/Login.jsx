import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link,useNavigate } from 'react-router-dom'
import LoginImg from '/src/assets/login.png'
import {toast} from 'react-toastify'
import Loader from './Loader'
import { auth, db } from '../firebase/config'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { selectURL } from '../redux/cartSlice'
const Login = () => {
  const {register,handleSubmit, formState: { errors },trigger}=useForm()
  const navigate=useNavigate()
  const [isLoading,setIsLoading]=useState(false)

  const url = useSelector(selectURL)
  let redirectURL=()=>{
    if(url.includes('cart')){navigate('/cart')}
    else navigate('/')
  } 

    let submitForm=async(user)=>{
      setIsLoading(true)
        try{
          signInWithEmailAndPassword(auth, user.email, user.password)
          .then(async(userCredential) => {
            const user1 = userCredential.user;
            const docRef = doc(db,"users",user1.uid)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
              // console.log(docSnap.data())
              let data = docSnap.data()
              if(data.role == '0'){
                navigate('/admin') 
              }
              else if(data.role == "1"){
                // navigate('/') 
                redirectURL()
              }
            }
            toast.success("loggedIn Successfully")
            setIsLoading(false)     
           
          })
          .catch((error) => {
            setIsLoading(false); toast.error("Invalid Credentails")
          });

           }
        catch(error){setIsLoading(false); toast.error("Invalid Credentails")}
    }

    const provider = new GoogleAuthProvider();
    let loginWithGoogle=()=>{
      signInWithPopup(auth, provider)
      .then(async(result) => {
          const user1 = result.user;
          const docRef = doc(db,"users",user1.uid)
          await setDoc(docRef,{username:user1.displayName,email:user1.email,role:'1',createdAt:Timestamp.now().toMillis() })                 
          toast.success("loggedIn Successfully")
          // navigate('/') 
          redirectURL()
        }).catch((error) => {
          toast.error(error.message)
      })
    }
  return (
    <div className='container mt-3 col-8 shadow p-4' >
      {isLoading && <Loader/>}
    <h1>Login Form</h1><hr/>
    <div className="row">
      <div className="col"><img src={LoginImg} className='img-fluid'/></div>
      <div className="col"> <form onSubmit={handleSubmit(submitForm)}>
       <div class="mb-3">
            <label for="" class="form-label">Email</label>
            <input type="text" name="email" class="form-control" 
            {...register('email',{required:"email is required",
            pattern:{value:/^[\w\!\#\$\%\^\&\*\-\+\=\.]+\@[\w]+\.[a-zA-Z]{3}$/, message:'invalid email'}})}  onBlur={()=>trigger('email')}/>
        </div>
        {errors.email && <span className='text-danger'>{errors.email.message}</span>}
        <div class="mb-3">
            <label for="" class="form-label">Password</label>
            <input type="password" name="password" class="form-control" {...register('password',{required:"Password is required"})}
             onBlur={()=>trigger('password')}/>
        </div>
        {errors.password && <span className='text-danger'>{errors.password.message}</span>}
        <div class="d-grid gap-2">
            <button  type="submit" class="btn btn-primary"> Submit </button>
        </div> <hr/>
        <div class="d-grid gap-2">
            <button  type="button" class="btn btn-danger" onClick={loginWithGoogle}> Login With Google </button>
        </div>
        <p>Create an Account ?? <Link to='/register'>Signup</Link></p>
    </form></div>
    </div>
   
</div>
  )
}

export default Login

