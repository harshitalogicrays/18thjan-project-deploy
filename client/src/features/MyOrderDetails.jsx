import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectorders } from '../redux/orderSlice'
import { FaArrowCircleLeft } from 'react-icons/fa'
const MyOrderDetails = () => {
    const {id}=useParams()
    const allorders=useSelector(selectorders)
    const order = allorders.find(item=>item.id==id)
  return (
    <div className='container shadow mt-2 p-2'>
    <h1>My Order Details</h1><hr/>
    <div className='mb-3'>
      <Link to='/myorders' className='btn btn-primary mb-2'>
          <FaArrowCircleLeft/>Back to Orders 
      </Link>
    </div>
          {order == null ? 
          <>
          <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
          </div>
          </>
          :<>
              <h4 className='text-info'>Order Status : {order.orderStatus}</h4>
              <b>Shipping Address</b><br/>
              
              Address: {order.shippingAddress.address},
              {order.shippingAddress.city}<br/>
              state:  {order.shippingAddress.state}<br/>
              country : {order.shippingAddress.country}<br/>
              pincode :{order.shippingAddress.pincode}
              <br/>
              <div class="table-responsive">
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th scope="col">Sr. No</th>
          <th scope="col">Name</th>
          <th>Image</th>
          <th scope="col">Price</th>
          <th>Quantity</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {order.cartItems.length==0 && <tr><td colSpan={7}>No Item in Cart</td></tr>}
        {order.cartItems.map((c,i)=>
          <tr key={i}>
            <td scope="row">{i+1}</td>
            <td>{c.name}</td>
            <td><img src={c.image} height='50px' width='50px' /></td>
            <td scope="row">{c.price}</td>
            <td> {c.qty} </td>
            <td>${c.qty * c.price}</td>
          </tr>
        )}
        <tr>
          <td colSpan={5}>Total Amount:</td>
          <td>${order.totalAmount}</td>
        </tr>
      </tbody>
    </table>
  </div>
          </>
          }
  </div>
  )
}

export default MyOrderDetails
