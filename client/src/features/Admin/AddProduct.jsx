import React, {Fragment, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form,  Row } from 'react-bootstrap'
import { Link, useNavigate, useParams} from 'react-router-dom'
import { toast } from 'react-toastify'
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db, storage } from '../../firebase/config'
import useFetchCollection from '../../customhook/useFetchCollection'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useSelector } from 'react-redux'
import { selectproducts } from '../../redux/productSlice'

const AddProduct = () => {
    let addProductsSet={name:'',price:'',category:'',image:[],brand:'',desc:'',stock:''}
    const [product,setProduct]=useState({...addProductsSet})
    const navigate=useNavigate()
    const [uploadProgress,setUploadProgress]=useState(0)
    const {data:categories}=useFetchCollection("categories")

    //edit 
    const {id}=useParams()
    const allproducts=useSelector(selectproducts)
    const productEdit=allproducts.find(item=>item.id==id)
    const [oldImages,setOldImages]=useState([])
    const [newImages,setNewImages]=useState([])
    useEffect(()=>{
        if(id){
            setProduct({...productEdit})
            setOldImages(productEdit.image)
        }
        else setProduct({...addProductsSet})
    },[id])

    let RemoveImage=(index,image)=>{
        const updatedImages=[...oldImages]
        updatedImages.splice(index,1)
        setOldImages(updatedImages)
        deleteObject(ref(storage,image))    
    }


    let handleImage=(e)=>{
        let images=e.target.files
        let arr=[]
        Array.from(images).forEach((file)=>{
            const storageRef = ref(storage, `18thjan/products/${Date.now()}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress) }, 
            (error) => { toast.error(error.message) }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    arr.push(downloadURL)
                    setNewImages((prev)=>[...prev,downloadURL])
                });});
            setProduct({...product,image:arr})
    })
    }
 let handleSubmit=async(e)=>{
        e.preventDefault()
        if(!id){
            try{

                const docRef=collection(db,"products")
                await addDoc(docRef,{...product,createdAt:Timestamp.now().toMillis() })
                toast.success("product added")
                navigate('/admin/viewproduct')
            }
            catch(error){
                toast.error(error.message)
            }
        }
        else {
            let allimages=[...oldImages,...newImages]
            try{
                const docRef=doc(db,"products",id)
                await setDoc(docRef,{...product,image:allimages,
                    createdAt:productEdit.createdAt,
                    editedAt:Timestamp.now().toMillis() })
                toast.success("product updated")
                navigate('/admin/viewproduct')
            }
            catch(error){
                toast.error(error.message)
            }
        }
            
    }
    return (
        <>
            <Card>
                <Card.Header><h1>Add Product
                    <Link to='/admin/viewproduct' type="button" class="btn btn-danger btn-lg float-end" >
                        View Products</Link>
                </h1></Card.Header>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col>
                                <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                            <Form.Label>Category</Form.Label>
                                            <Form.Select name="category" value={product.category} onChange={(e)=>setProduct({...product,category:e.target.value})}>
                                                <option value='' disabled>select one </option>
                                                {categories.map((c,i)=><option key={c.id}>{c.title}</option>)}
                                            </Form.Select>
                                        </Form.Group>
                                        <Row>
                                        <Form.Group className='mb-3 col-6'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control  name="name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group className='mb-3 col-6'>
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control  name="brand" value={product.brand} onChange={(e)=>setProduct({...product,brand:e.target.value})} />
                                    </Form.Group>
                                    </Row>                                  
                                    <Row>
                                    <Form.Group className='mb-3 col-6'>
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="number"  name="price" value={product.price} onChange={(e)=>setProduct({...product,price:e.target.value})}/>
                                    </Form.Group>
                                    <Form.Group className='mb-3 col-6'>
                                        <Form.Label>Stock</Form.Label>
                                        <Form.Control  type="number" name="stock" value={product.stock} onChange={(e)=>setProduct({...product,stock:e.target.value})}/>
                                    </Form.Group>
                                    </Row>
                                    {uploadProgress > 0 &&
                        <div class="progress">
                        <div class="progress-bar" style={{width: `${uploadProgress}%`}}>
                            {uploadProgress < 100 ? `uploading ${uploadProgress}%` : `uploaded ${uploadProgress}%`}
                        </div>
                      </div>
                    }
               <Form.Group controlId="formFile" className="mb-3">
              <Form.Label> file upload </Form.Label>
               <Form.Control type="file"  onChange={handleImage} multiple/>
                </Form.Group>
                {id && <>
                    {oldImages.map((img,i)=><Fragment key={i}>
                        <img src={img} height={100} width={100}></img>
                        <span style={{position:'relative',top:'-45px',marginRight:'10px',cursor:'pointer'}} onClick={()=>RemoveImage(i,img)}>X</span>
                    </Fragment>
                )}   
                </>
                }


                                        <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Description</Form.Label>
                                  
                                        <Form.Control as="textarea" name='desc' value={product.desc} onChange={(e)=>setProduct({...product,desc:e.target.value})}/>
                                    </Form.Group>
                                    <Button variant='primary' type="submit" 
                                  >Submit</Button>
                                </Form>
                            </Col>
                        </Row>


                    </Container>
                    </Card.Body>
            </Card>
        </>
    )
}

export default AddProduct
