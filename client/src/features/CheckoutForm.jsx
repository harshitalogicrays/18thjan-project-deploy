import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectUserEmail, selectUserId, selectUserName } from "../redux/authSlice";
import { EMPTY_CART, selectAmount, selectCart } from "../redux/cartSlice";
import { selectShippingAddress } from "../redux/checkoutSlice";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) { return;   }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) { return;  }
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) { return;  }
    setIsLoading(true);
   
    await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkout-success",
      },redirect:"if_required",
    }).then((result)=>{
        if(result.error){toast.error(result.error);return}
        if(result.paymentIntent){
            if(result.paymentIntent.status=="succeeded"){
                toast.success("Payment done")
                setIsLoading(false)
                saveorder()
            }
        }
    })
    setIsLoading(false);
  };

  const paymentElementOptions = {layout: "tabs"}

  const navigate=useNavigate()
  const dispatch=useDispatch()
let userId=useSelector(selectUserId)
let userEmail=useSelector(selectUserEmail)
let cartItems=useSelector(selectCart)
let totalAmount=useSelector(selectAmount)
let shippingAddress=useSelector(selectShippingAddress)
let userName=useSelector(selectUserName) 
  
let saveorder=async()=>{
    let today = new Date()
    try{
        let orderConfig={userId,userEmail,cartItems,totalAmount,shippingAddress,userName,
            orderStatus:"Placed",orderDate:today.toLocaleDateString(),orderTime:today.toLocaleTimeString(),
        createdAt:Timestamp.now().toMillis()}
        const docRef=collection(db,"orders")
        await addDoc(docRef,orderConfig)
        sendmail(orderConfig)
        toast.success("order placed")
       dispatch(EMPTY_CART())
       navigate('/checkout-success') 
    }
    catch(err){
        toast.error(err.message)
    }
}

let sendmail=(orderConfig)=>{
   fetch("http://localhost:2000/mail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email:userEmail,status:orderConfig.orderStatus,amount:totalAmount,name:userName }),
  })
    .then((res) => res.json())
    .then((data) => toast.success(data.message))
    .catch(err=>toast.error(err.message))
}

  return (
    <form id="payment-form" onSubmit={handleSubmit}>

      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <div class="d-grid gap-2">
        <button className="btn btn-primary mt-3" disabled={isLoading || !stripe || !elements} id="submit">
            <span id="button-text">
            {isLoading ? <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        </div> : "Pay now"}
            </span>
        </button>
      </div>
      
     
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}