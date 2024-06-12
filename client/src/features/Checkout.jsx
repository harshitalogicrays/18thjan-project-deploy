import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useSelector } from "react-redux";
import { selectAmount } from "../redux/cartSlice";
import CheckoutSummary from "./CheckoutSummary";
const stripePromise = loadStripe("pk_test_51NOvqGSAvExKFAjaCl4fAxmf3CFJlq54guOtblHh0nEuB7XGZ9KXvKSgHgjjiIc0kexx4SUn67Z4iXDBB9q3fevA0096oZR8bw");

export default function Chekout() {
  const [clientSecret, setClientSecret] = useState("");
  const amount=useSelector(selectAmount)
  useEffect(() => {
    fetch("http://localhost:2000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="container mt-5 col-9">
        <div className="row">
            <div className="col">
                <CheckoutSummary/>
            </div>
            <div className="col">
                <h1>Stripe Checkout</h1><hr/>
                {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
                </Elements>
      )}
            </div>
        </div>
     
    </div>
  );
}