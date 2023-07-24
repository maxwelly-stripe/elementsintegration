import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_51NO1YjH5aAv8RRbVBMuYrqqw7zd2s1ERkOcc53FBZwD7a5dHqGzzkZtO7bvLyuIzVcmhGGo1UqpbioHcTI4l2FPy00ahqjjJss");

export default function App() {
  const [clientSecret, setClientSecret] = useState("");
  console.log("HERE");
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/server", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'night',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
