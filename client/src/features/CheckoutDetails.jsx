import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import CheckoutSummary from './CheckoutSummary'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_ADDRESS, selectShippingAddress } from '../redux/checkoutSlice'
import { useNavigate } from 'react-router-dom'

const CheckoutDetails = () => {
    let initialvalues = {name:'',email:'',mobile:'',address:'',state:'',city:'',country:'',pincode:''}
    let [shippingAddress,setShippingAddress]=useState({...initialvalues})
    const dispatch=useDispatch()
    const navigate=useNavigate()
    let handleSubmit=(e)=>{
        e.preventDefault()
        // alert(JSON.stringify(shippingAddress))
        dispatch(STORE_ADDRESS(shippingAddress))
        navigate('/checkout')}
    
    const address=useSelector(selectShippingAddress)
    useEffect(()=>{
        if(Object.keys(address).length !=0){
            setShippingAddress({...address})
        }
        else setShippingAddress({...initialvalues})
    },[address])
  return (
    <> <Container className='mt-5 shadow p-3'>
        <Row><Col>
            <h1>Checkout Details</h1><hr/>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                        <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={shippingAddress.name}
                        onChange={(e)=>setShippingAddress({...shippingAddress , name:e.target.value})}/>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text"  value={shippingAddress.email}
                        onChange={(e)=>setShippingAddress({...shippingAddress , email:e.target.value})}/>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group className="mb-3">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="number"  value={shippingAddress.mobile}
                        onChange={(e)=>setShippingAddress({...shippingAddress , mobile:e.target.value})}/>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group className="mb-3">
                        <Form.Label>city</Form.Label>
                        <Form.Control type="text"  value={shippingAddress.city}
                        onChange={(e)=>setShippingAddress({...shippingAddress , city:e.target.value})}/>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group className="mb-3">
                        <Form.Label>country</Form.Label>
                        <Form.Control type="text"  value={shippingAddress.country}
                        onChange={(e)=>setShippingAddress({...shippingAddress , country:e.target.value})}/>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group className="mb-3">
                        <Form.Label>state</Form.Label>
                        <Form.Control type="text"  value={shippingAddress.state}
                        onChange={(e)=>setShippingAddress({...shippingAddress , state:e.target.value})}/>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" as="textarea"  value={shippingAddress.address}
                        onChange={(e)=>setShippingAddress({...shippingAddress , address:e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control type="number"  value={shippingAddress.pincode}
                        onChange={(e)=>setShippingAddress({...shippingAddress , pincode:e.target.value})}/>
                        </Form.Group>
                        <Button type="submit">Proceed to Checkout</Button>
                </Form>
            </Col>
            <Col>
                <CheckoutSummary/>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default CheckoutDetails
