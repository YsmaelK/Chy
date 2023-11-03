import React, { useState, useEffect } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import awsExports from '../../aws-exports';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Button } from '@mui/material';

Amplify.configure(awsExports);
const stripePromise = loadStripe('pk_test_51O8DXGKvrB6fpE6lEKSleVz2fJGfTfLNnrgQtNio9fPPblJPnSaCQFcPRmVkPfaKqd1SEQDIlOh48Z62cQdwD2ut00BzvMxTht');
const AddressForm = ({ cart }) => {
  const [user, setUser] = useState(null);

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

  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if (error) {
      console.log(error);
    } else {
      // Process the payment or save the payment method here
      console.log(paymentMethod);
    }
  };

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
        cart.line_items.map((item) => (
          <div key={item.id} className="cart-item">
            <Typography variant="h6">{item.productName}</Typography>
            <Typography variant="body1">
              Price:{' '}
              {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : `$${parseFloat(item.price).toFixed(2)}`}
            </Typography>
          </div>
        ))
      ) : (
        <Typography variant="body1">No items in cart</Typography>
      )}
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
        Payment Method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined">Back</Button>
                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                  Pay {cart && cart.subtotal && cart.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};

export default AddressForm;
