import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_ORDERS, selectorders } from '../../redux/orderSlice'
import { Link } from 'react-router-dom'
import useFetchCollection from '../../customhook/useFetchCollection'

const Orders = () => {
    const {data,isLoading}=useFetchCollection("orders")
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(STORE_ORDERS(data))
    },[data])

    const orders=useSelector(selectorders)
  return (
    <div className='container shadow mt-3 p-3'>
    {isLoading && <Loader/>}
    <h1> Orders</h1><hr/>
    {orders.length == 0 ?  <h1>No Orders</h1>
    :
    <>
    <table className="table table-bordered table-hover">
           <thead>
             <tr>
               <th>s/n</th>
               <th>Date</th>
               <th>Order ID</th>
               <th>User</th>
               <th>Order Amount</th>
               <th>Order Status</th>
               <th>View</th>
             </tr>
           </thead>
           <tbody>
             {orders.map((order, index) => {
               const {
                 id, orderDate, orderTime, totalAmount, orderStatus,userEmail} = order;
               return (
                 <tr key={id}>
                   <td>{index + 1}</td>
                   <td> {orderDate} at {orderTime}
                   </td>
                   <td>{id}</td>
                   <td>{userEmail}</td>
                   <td> {"$"}{totalAmount} </td>
                   <td>
                     <p className={
                         orderStatus !== "Delivered"
                           ? "text-danger": "text-success"  } >
                       {orderStatus}
                     </p>
                   </td>
                   <td>
                    <Link to={`/admin/orders/details/${id}`} type="button" class="btn btn-primary">View</Link>
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

export default Orders
