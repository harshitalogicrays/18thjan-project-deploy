import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { ADD_TO_CART } from '../redux/cartSlice'
import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {
    let {id,name,image,price,category,stock}=product
    const dispatch=useDispatch()
    let handleCart=()=>{
            dispatch(ADD_TO_CART(product))
    }
  return (
    <div className="col-3 mb-3">
        <div className="card">
            <Link to={`/product-details/${id}`}>
            <img className="card-img-top"  src={image[0]} height={170} alt="Title" />
            </Link>
            <div className="card-body">
                <h4 className="card-title">{name}</h4>
                <p className="card-text">{category}</p>
                <p className="card-text">${price}</p>
                <p className="card-text">Available : {stock}</p>
                <button
                    type="button"
                    class="btn btn-primary" onClick={handleCart}
                >
                    Add to Cart
                </button>
                
            </div>
        </div>
    </div>  
  )
}

export default ProductCard
