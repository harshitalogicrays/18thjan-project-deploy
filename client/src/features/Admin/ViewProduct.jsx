import React, { useEffect, useState } from 'react'
import { Card, Table } from 'react-bootstrap'
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_PRODUCTS, selectproducts } from '../../redux/productSlice'
import { deleteDoc, doc } from 'firebase/firestore'
import { db, storage } from '../../firebase/config'
import { deleteObject, ref } from 'firebase/storage'
import useFetchCollection from '../../customhook/useFetchCollection'

const ViewProduct = () => {
  const {data}=useFetchCollection("products")
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(STORE_PRODUCTS(data))
  },[data])
  const products=useSelector(selectproducts)

   let handleDelete=async(id,images)=>{
    if(window.confirm('are you sure to delete this??')){
      try{
       const docRef=doc(db,"products",id)
       images.forEach((img)=>deleteObject(ref(storage,img)))
       deleteDoc(docRef)
       toast.success("product deleted")
      }
      catch(err){toast.error(err.message)}
    }
    }
  return (
    <Card>
    <Card.Header><h1>View Products
        <Link to='/admin/addproduct' type="button" class="btn btn-primary btn-lg float-end" >
            Add Product</Link>              
        </h1></Card.Header>
        <Card.Body>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Category</th>
          <th>Name</th>
          <th>Image</th><th>Price</th>
            <th>Stock</th> <th>Action</th>        </tr>
      </thead>
      <tbody>
        {products.length==0 && <tr><td colSpan={7}>No product found</td></tr>}
        {products.map((product,i)=>
            <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.category}</td>
            <td>{product.name}</td>
            <td><img src={product.image[0]} height="50px" width={50}/></td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
            <td> <Link to={`/admin/editproduct/${product.id}`} type="button" class="btn btn-success me-2"><FaPenAlt/></Link>
                 <button type="button" class="btn btn-danger me-2" 
                 onClick={()=>handleDelete(product.id,product.image)} ><FaTrashAlt/></button>
             </td>
            </tr>
        )}      
        </tbody>
    </Table>
        </Card.Body>
</Card>
  )
}

export default ViewProduct
