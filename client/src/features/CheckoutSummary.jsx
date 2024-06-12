import React from 'react'
import { useSelector } from 'react-redux'
import { selectAmount, selectCart } from '../redux/cartSlice'

const CheckoutSummary = () => {
    const cartItems = useSelector(selectCart)
    const Total = useSelector(selectAmount)
  return (
    <> <h1>Checkout Summary</h1><hr/>
    <div > <h5>Total Items :{cartItems.length}<br/>
                    Total Price : ${Total}</h5>
       {cartItems.map((c,i)=>
                <div className="card mb-2" key={i}>
                    <p>Item : {c.name}<br/>
                        Qty : {c.qty}<br/>
                        unit price: {c.price}
                    </p>
                </div>
            )}
            </div>

    </>
  )
}

export default CheckoutSummary
