import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe } from '@stripe/react-stripe-js';

// import CheckoutForm from "./CheckoutForm";
import '../App.css';
import CheckoutForm from '../components/CheckoutForm';
import { useLocation, useParams } from 'react-router-dom';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(
  'pk_test_51NVB2sFyQ4w6iyOsfZbQyzRpprz9UTKew0BrjW4BwKlAWMI8HtoQ0wa7BhI58U8GQN02HlRsgisnuDnK0bMOcF9a00dK9GdRR7'
);

export default function PaymentPage() {
  const { id } = useParams();
  let { state } = useLocation();

  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <CheckoutForm id={id} price={state.price} />
      </Elements>
    </div>
  );
}
