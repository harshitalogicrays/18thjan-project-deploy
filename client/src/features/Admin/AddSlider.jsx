import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button, Card,Form, Image } from 'react-bootstrap'
import {  Link, useNavigate, useParams } from 'react-router-dom'
import { db, storage } from '../../firebase/config'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { selectSliders } from '../../redux/sliderSlice'

const AddSlider = () => {
    let [slider,setSlider]=useState({title:'',desc:'',status:'',image:''})
    let [isActive,setIsActive]=useState(false)
    let [uploadProgress,setUploadProgress]=useState(0)
    const navigate=useNavigate()

    //edit 
    const {id}=useParams()
    const sliders=useSelector(selectSliders)
    const sliderEdit= sliders.find(item=>item.id==id)
    useEffect(()=>{
        if(id){
            setSlider(sliderEdit)
            setIsActive(()=>sliderEdit.status=="Active"?true:false)
        }
        else setSlider({title:'',desc:'',status:'',image:''})
    },[id])

    let handleImage=(e)=>{
        // console.log(e.target.files[0])
        let file=e.target.files[0]
        const storageRef = ref(storage, `18thjan/sliders/${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress) }, 
        (error) => { toast.error(error.message) }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log('File available at', downloadURL);
            setSlider({...slider,image:downloadURL})
            });
        }
        );
    }

    let handleSubmit=async(e)=>{
        e.preventDefault()
        if(!id){//add
            try{
                const docRef = collection(db,"sliders")
                await addDoc(docRef,{...slider, status:isActive ? "Active":"Inactive",createdAt:Timestamp.now().toMillis()})
                toast.success("Slider Added")
                navigate('/admin/viewslider')
            }
            catch(err){toast.error(err.message)}
        }
        else {//update
            if(sliderEdit.image != slider.image){
                deleteObject(ref(storage,sliderEdit.image))
            }
            try{
                const docRef = doc(db,"sliders",id)
                await setDoc(docRef,{...slider, status:isActive ? "Active":"Inactive",createdAt:sliderEdit.createdAt,
                editedAt:Timestamp.now().toMillis()})
                toast.success("Slider Updated")
                navigate('/admin/viewslider')
            }
            catch(err){toast.error(err.message)}
        }
        
    }

  return (
    <Card>
        <Card.Header>
            <h1>{id ? "Edit " :"Add "} Slider <Button variant='danger' size="lg" className='float-end' as={Link} to='/admin/viewslider'>View Slider</Button></h1>
        </Card.Header>
        <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control value={slider.title} onChange={(e)=>setSlider({...slider,title:e.target.value})}></Form.Control>
                    </Form.Group>
                    {uploadProgress > 0 &&
                        <div class="progress">
                        <div class="progress-bar" style={{width: `${uploadProgress}%`}}>
                            {uploadProgress < 100 ? `uploading ${uploadProgress}%` : `uploaded 100%`}
                        </div>
                        </div>
                        }
                    <Form.Group className='mb-3'>
                        <Form.Label>Choose Image</Form.Label>
                        <Form.Control type="file" onChange={handleImage}></Form.Control>
                    </Form.Group>
                    {id && <Image src={slider.image} style={{height:'50px',width:'50px  '}}/>}
                    <Form.Group className='mb-3'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as='textarea' value={slider.desc} onChange={(e)=>setSlider({...slider,desc:e.target.value})}></Form.Control>
                    </Form.Group>
                    <label className='me-3 mb-3'>Status</label>
                        <Form.Check inline type="radio" checked={isActive} 
                        onClick={(e)=>setIsActive(!isActive)}/>
                        <label>{isActive ? "(Active)" :"(Inactive)"}</label>
                    <br/>
                    <Button type="submit">{id ? "Update":"Submit    "}</Button>
                </Form>
        </Card.Body>
    </Card>
  )
}

export default AddSlider
