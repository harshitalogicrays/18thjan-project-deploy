import React, { useEffect } from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useFetchCollection from '../../customhook/useFetchCollection'
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_CATEGORIES, selectCategories } from '../../redux/categorySlice'
import { toast } from 'react-toastify'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/config'

const ViewCategory = () => {
  const {data,isLoading} = useFetchCollection("categories")
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(STORE_CATEGORIES(data))
  },[data])

  const categories = useSelector(selectCategories)

  let handleDelete=async(id)=>{
    if(window.confirm('are you sure to delete this??')){
      try{
          const docRef = doc(db,"categories",id)
          await deleteDoc(docRef)
          toast.success("Category deleted")
      }
      catch(err){toast.error(err.message)}
    }
  }
    return (
    <Card>
        <Card.Header>
            <h1>View Category <Button variant='danger' size="lg" className='float-end' as={Link} to='/admin/addcategory'>Add Category</Button></h1>
        </Card.Header>
        <Card.Body>
        <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Sr.No</th>
          <th>ID</th>
          <th>Title</th>
          <th>description</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {categories.length==0 &&  <tr><td colSpan={6}>No Category Found</td></tr>}
      {categories.map((c,i)=>
          <tr key={c.id}>
            <td>{i+1}</td>
            <td>{c.id}</td>
            <td>{c.title}</td>
            <td>{c.desc}</td>
            <td>{c.status=="Active" ? <span class="badge rounded-pill text-bg-success">Active</span >
            :<span class="badge rounded-pill text-bg-danger">Inactive</span >
            }</td>
            <td>
              <Button variant='success' className='me-2' as={Link} 
              to={`/admin/editcategory/${c.id}`}
              ><FaPenAlt/></Button>
              <Button variant='danger' className='me-2' onClick={()=>handleDelete(c.id)}><FaTrashAlt/></Button>
            </td>
          </tr>
          )}
      </tbody>
    </Table>
        </Card.Body>
    </Card>
  )
}

export default ViewCategory
