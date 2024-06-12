import React, { useContext, useEffect } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, CALCULATE_TOTAL, DECREASE, EMPTY_CART, REMOVE_ITEM, SAVE_URL, selectAmount, selectCart } from '../redux/cartSlice'
import { selectIsLoggedIn } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const cart = useSelector(selectCart)
    const total =useSelector(selectAmount)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(CALCULATE_TOTAL())},[cart])
    
    const isLoggedIn=useSelector(selectIsLoggedIn)
    const navigate=useNavigate()
    let url=window.location.href
    let handleCheckout=()=>{
        if(isLoggedIn){navigate('/checkout-details')}
        else {
            dispatch(SAVE_URL(url))
            navigate('/login')
        }
    }
  return (
   <> <Container className='mt-5 '>
        <h1>Cart Page</h1><hr/>
        <Table className='table table-bordered table-striped'>
            <thead>  <tr>
                    <th>Sr. No</th><th>Name</th><th>Image</th><th>Price</th><th>qty</th>
                    <th>Total Price</th><th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {cart.length==0 &&    <tr><td colSpan={7}>No Item in Cart</td></tr> }
             {cart.map((c,i)=>
                <tr key={c.id}>
                    <td>{i+1}</td> <td>{c.name}</td>
                    <td><img src={c.image} height={50} width={50}/></td> <td>{c.price}</td>
              <td> <button type="button" onClick={()=>dispatch(DECREASE(c))}>-</button>
               <input type="text" style={{width:'40px',textAlign:'center'}} value= {c.qty}/>
             <button type="button" onClick={()=>dispatch(ADD_TO_CART(c))}>+</button>
                       </td>
                    <td>{c.qty*c.price}</td>
                    <td>
            <button type="button" class="btn btn-danger me-2" onClick={()=>dispatch(REMOVE_ITEM(c.id))}  >
            <i className='bi bi-trash'></i> Remove
         </button> </td>  </tr>  )}
            </tbody>
        </Table>
        <Row>
            <Col xs={9}>
                    <button type="button" class="btn btn-danger btn-lg"  
                    onClick={()=>dispatch(EMPTY_CART())}> Empty Cart  </button>  </Col>
            <Col xs={3}>
                <h1>Total: <span className='float-end'>${total}</span></h1>
                <div class="d-grid gap-2">
                    <button type="button" class="btn btn-primary" onClick={handleCheckout}
                        disabled={cart.length==0 ? 'disabled':''}
                    >Checkout </button>
                </div>       
            </Col>
        </Row>
    </Container>
   </>
  )
}

export default Cart
