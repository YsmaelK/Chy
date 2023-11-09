import React, { useState, useEffect } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import awsExports from '../../aws-exports';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, ElementsConsumer,useElements, useStripe } from '@stripe/react-stripe-js';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Button } from '@mui/material';

Amplify.configure(awsExports);
const stripePromise = loadStripe('pk_test_51O8DXGKvrB6fpE6lEKSleVz2fJGfTfLNnrgQtNio9fPPblJPnSaCQFcPRmVkPfaKqd1SEQDIlOh48Z62cQdwD2ut00BzvMxTht');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
  
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
  
    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(null);
    } else {
      setPaymentSuccess(paymentMethod.id);
      setPaymentError(null);
  
      // Send the paymentMethod.id to your server to complete the payment
      try {
        const response = await fetch('/review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
        });
  
        if (response.ok) {
          console.log('Payment processed successfully');
        } else {
          console.error('Failed to process payment');
        }
      } catch (error) {
        console.error('Error sending payment details to server:', error);
      }
    }
  };
  

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <Button type="submit" disabled={!stripe}>
          Pay
        </Button>
      </form>
      {paymentError && <Typography variant="body1" color="error">{paymentError}</Typography>}
      {paymentSuccess && <Typography variant="body1" color="success">Payment successful!</Typography>}
    </div>
  );
};


const AddressForm = ({ cart }) => {
  const [user, setUser] = useState(null);
  const [paymentComplete, setPaymentComplete] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await Auth.currentAuthenticatedUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user: ', error);
      }
    };

    fetchUser();
  }, []);

  

  return (
    <div>
      {user && (
        <div>
          <h2>Review</h2>
          <Typography variant="body1">Username: {user.username}</Typography>
          <Typography variant="body1">Email: {user.attributes.email}</Typography>
        </div>
      )}

{cart.line_items ? (
  cart.line_items.map((item, index) => (
    <div key={index} className="cart-item">
      <Typography variant="h6">
        {item.productName}
      </Typography>
      <Typography variant="body1">
        Price:{' '}
        {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : `$${parseFloat(item.price).toFixed(2)}`}
      </Typography>
    </div>
  ))
) : (
  <Typography variant="body1" key="no-items">
    No items in cart
  </Typography>
)}

      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
        Payment Method
      </Typography>
      <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
    </div>
  );
};

export default AddressForm;
