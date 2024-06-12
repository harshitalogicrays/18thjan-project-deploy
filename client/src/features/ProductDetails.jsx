import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectproducts } from '../redux/productSlice'
import { ADD_TO_CART, DECREASE, selectCart } from '../redux/cartSlice'
import { Button } from 'react-bootstrap'
import ImageThumbnail from './ImageThumbnail'

const ProductDetails = () => {
    const {id}=useParams()
    const dispatch=useDispatch()
    const products=useSelector(selectproducts)
    const product =products.find(item=>item.id==id)

    const cartItems=useSelector(selectCart)
    const itemIndex = cartItems.findIndex(item=>item.id==product.id) 
    const item =  cartItems.find(item=>item.id==product.id) 
    const similarproducts =  products.filter(item => item.category == product.category)
  return (
    <div className='container mt-5'>
        <div className="row">
            <div className="col">
              <ImageThumbnail images={product.image}/>
            </div>
            <div className="col">
            {product.stock > 0 ? 
            <span  class="badge rounded-pill text-bg-success float-end">In Stock</span>
            :
            <span  class="badge rounded-pill text-bg-danger float-end">out of Stock</span>
            }
            <h4 >{product.category}</h4>
            <h5>{product.name}</h5>
            <p>${product.price}</p>
            <p>{product.desc}</p>
            {itemIndex == -1 ? 
            <Button  onClick={()=>dispatch(ADD_TO_CART(product))}>Add to Cart</Button>
            :
<>
            <button type="button"  onClick={()=>dispatch(DECREASE(item))}>-</button>
            <input type="text" style={{width:'40px',textAlign:'center'}} value={item.qty} readOnly />
            <button type="button" onClick={()=>dispatch(ADD_TO_CART(item))}>+</button>
          
</>
            }
            </div>
        </div>
    </div>
  )
}

export default ProductDetails
