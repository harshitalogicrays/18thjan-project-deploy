import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSuccess = () => {
  return (
    <div className='container col-6 mt-5 shadow p-3'>
        Thank you for you order. <hr/>
      <Link type="button" class="btn btn-primary" to='/'>Shop Now</Link>
    </div>
  )
}

export default CheckoutSuccess
