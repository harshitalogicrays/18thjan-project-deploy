import React, { useEffect } from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import useFetchCollection from '../../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_SLIDERS, selectSliders } from '../../redux/sliderSlice'
import { deleteDoc, doc } from 'firebase/firestore'
import { db, storage } from '../../firebase/config'
import { deleteObject, ref } from 'firebase/storage'
import { toast } from 'react-toastify'

const ViewSlider = () => {
    const {data}=useFetchCollection("sliders")
    // console.log(data)
    const dispatch=useDispatch()
    useEffect(()=>{
      dispatch(STORE_SLIDERS(data))
    },[data])
    const sliders=useSelector(selectSliders)
  
    let handleDelete=(id,image)=>{
      if(window.confirm('are you sure to delete this??')){
        try{
          const docRef=doc(db,"sliders",id)
          deleteObject(ref(storage,image)) //delete image from  storage
          deleteDoc(docRef)
          toast.success("slider deleted")
        }
        catch(err){toast.error(err.message)}
      }
    }
  
  return (
    <Card>
    <Card.Header>
        <h1>View Slider <Button variant='danger' size="lg" className='float-end' as={Link} to='/admin/addslider'>Add Slider</Button></h1>
    </Card.Header>
    <Card.Body>
    <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>Sr.No</th>
      <th>ID</th>
      <th>Title</th>
      <th>description</th>
      <th>Image</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {sliders.length==0 &&  <tr><td colSpan={6}>No Category Found</td></tr>}
  {sliders.map((c,i)=>
      <tr key={c.id}>
        <td>{i+1}</td>
        <td>{c.id}</td>
        <td>{c.title}</td>
        <td>{c.desc}</td>
        <td> <img src={c.image} width={50} height={50}/></td>
        <td>{c.status=="Active" ? <span class="badge rounded-pill text-bg-success">Active</span >
        :<span class="badge rounded-pill text-bg-danger">Inactive</span >
        }</td>
        <td>
          <Button variant='success' className='me-2' as={Link} 
          to={`/admin/editslider/${c.id}`}
          ><FaPenAlt/></Button>
          <Button variant='danger' className='me-2' onClick={()=>handleDelete(c.id,c.image)}><FaTrashAlt/></Button>
        </td>
      </tr>
      )}
  </tbody>
</Table>
    </Card.Body>
</Card>

  )
}

export default ViewSlider
