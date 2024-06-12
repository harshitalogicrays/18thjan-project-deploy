import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'
import useFetchCollection from '../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_PRODUCTS, selectproducts } from '../redux/productSlice'
import { Col, Container, Row } from 'react-bootstrap'
import { FILTER_BY_CATEGORY, FILTER_BY_PRICE, selectCategory, selectFilterProducts, selectPrice, selectSearch } from '../redux/filterSlice'
const Products = () => {
  const {data}=useFetchCollection("products")
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(STORE_PRODUCTS(data))
  },[data])
  const products=useSelector(selectproducts)

  const {data:categories}=useFetchCollection("categories")

  const [category,setCategory]=useState('')
  useEffect(()=>{
    dispatch(FILTER_BY_CATEGORY({products,category}))
  },[category])

  const [price,setPrice]=useState('')
  useEffect(()=>{
    dispatch(FILTER_BY_PRICE({products,price}))
  },[price])

  const categoryvalue = useSelector(selectCategory)
  const pricevalue = useSelector(selectPrice)
  const searchvalue=useSelector(selectSearch)
  const filterProducts=useSelector(selectFilterProducts)
  return (
  <Container className='mt-5'>
      <h1>Products Page</h1> <hr/>
      <Row className='mb-3'>
        <Col xs={{span:'4'}}>
            <div className="row">
              <label className='col-form-label col-3'><b>Category</b></label>
              <div className="col-7">
                <select className='form-select' value={category} onChange={(e)=>setCategory(e.target.value)}>
                  <option value='' selected disabled>Select One</option>
                  {categories.map((c)=><option key={c.id}>{c.title}</option>)}
                </select>
              </div>
            </div>
        </Col>
        <Col xs={{span:'4',offset:'4'}}>
        <div className="row">
              <label className='col-form-label col-3'><b>Sort By</b></label>
              <div className="col-7">
                <select className='form-select' value={price} onChange={(e)=>setPrice(e.target.value)}>
                  <option value='' selected disabled>Select One</option>
                  <option value='low'>Low to High</option>
                  <option value='high'>High to Low</option>
                </select>
              </div>
            </div>
        </Col>
      </Row>
      {searchvalue =='' && categoryvalue=='' && pricevalue=='' ?   
           <ProductList products={products}/>
      : 
          <>
            {filterProducts.length==0 ? <Container className="mt-5">No product Found</Container>
            :
            <ProductList products={filterProducts}/>
            }
          </>
      }
  </Container>
  )
}

export default Products









