import React, { useEffect } from 'react'
import useFetchCollection from '../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_ORDERS, selectorders } from '../redux/orderSlice'
import { selectUserId } from '../redux/authSlice'
import { Link } from 'react-router-dom'

const MyOrders = () => {
    const {data,isLoading}=useFetchCollection("orders")
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(STORE_ORDERS(data))
    },[data])
    const allorders=useSelector(selectorders)
    const userId=useSelector(selectUserId)
    const orders = allorders.filter(item=>item.userId==userId)
  return (
    <div className='container shadow mt-3 p-3'>
    {isLoading && <Loader/>}
    <h1>My Orders</h1><hr/>
    {orders.length == 0 ?  <h1>No Orders</h1>
    :
    <>
    <table className="table table-bordered table-hover">
           <thead>
             <tr>
               <th>s/n</th>
               <th>Date</th>
               <th>Order ID</th>
               <th>Order Amount</th>
               <th>Order Status</th>
               <th>View</th>
             </tr>
           </thead>
           <tbody>
             {orders.map((order, index) => {
               const {
                 id, orderDate, orderTime, totalAmount, orderStatus} = order;
               return (
                 <tr key={id}>
                   <td>{index + 1}</td>
                   <td> {orderDate} at {orderTime}
                   </td>
                   <td>{id}</td>
                   <td> {"$"}{totalAmount} </td>
                   <td>
                     <p className={
                         orderStatus !== "Delivered"
                           ? "text-danger": "text-success"  } >
                       {orderStatus}
                     </p>
                   </td>
                   <td>
                    <Link to={`/myorders/details/${id}`} type="button" class="btn btn-primary">View</Link>
                   </td>
                 </tr>
               );
             })}
           </tbody>
         </table>   
   </>
    }
  </div>
  )
}

export default MyOrders
