import { Timestamp, doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../../firebase/config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ChangeOrderStatus = ({id,status,order}) => {
    const [ostatus,setOStatus]=useState(status)
    const navigate=useNavigate()
    let handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const docRef = doc(db,"orders",id)
            await setDoc(docRef,{...order,orderStatus:ostatus, createdAt:order.createdAt, editedAt:Timestamp.now().toMillis()})
            sendmail()
           
        }
        catch(err){toast.error(err.message)}
    }

    let sendmail=()=>{
        fetch("http://localhost:2000/mail", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ email:order.userEmail,status:ostatus,amount:order.totalAmount,name:order.userName }),
       })
         .then((res) => res.json())
         .then((data) =>{
            toast.success(data.message)
            toast.success("order status changed")
            navigate('/admin/orders')
         } )
         .catch(err=>toast.error(err.message))
     }
  return (
   <>
    <h3>Updayte Order Status</h3>
    <form onSubmit={handleSubmit}>
        <div class="mb-3 col-6">
            <label for="" class="form-label">Status</label>
            <select class="form-select" value={ostatus} onChange={(e)=>setOStatus(e.target.value)}>
                <option >Placed</option>
                <option >Shipped </option>
                <option >Cancelled</option>
                <option>Processing</option>
                <option>Delivered</option>
            </select>
        </div>
        <button type="submit" class="btn btn-primary">Update</button>       
    </form>
   </>
  )
}

export default ChangeOrderStatus
