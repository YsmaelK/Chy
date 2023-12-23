import React from 'react';
import { Link } from 'react-router-dom';
import db from '../../Firebase';
import { Card, CardContent, Typography } from '@mui/material';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PayPalPayment from './PayPalPayment';
import './Cart.css'; // Import a CSS file for styling
import { useNavigate } from 'react-router-dom';
const Cart = ({ cart, onCheckout, onRemoveFromCart, firestoreCartItems, onRemoveFCart }) => {
  console.log(cart);
  const navigate = useNavigate();
  const handleCheckout = () => {
    console.log('Checkout initiated:', cart.line_items);
    onCheckout();
  };

  const initialOptions = {
    clientId: "AWcBN5Fp0cJ_UOP1A5GcN_8OGsQ7J8ov62UgmoUFpXY7XOC4sUQr5TklLQ1JOIth5ltqc_uH0SR2Flm2",
    currency: "USD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="cart">
        <h1>Your Shopping Cart</h1>

        {firestoreCartItems.length ? (
          <div className="cart-items-container"> {/* Add a class for styling */}
            {firestoreCartItems.map((item, index) => (
              <Card key={`${item.id}-${index}`} className="cart-item">
                <CardContent>
                  <Typography variant="h6" component="div">
                    {item.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : `$${parseFloat(item.price).toFixed(2)}`}
                  </Typography>
                  <img src={item.photo} alt={item.productName} style={{ width: '100px', height: '100px' }} />
                  <button onClick={() => onRemoveFCart(item.id)}>Remove from Cart</button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>No items in cart</p>
        )}
        <h2>Cart Summary</h2>
        <p>Total Items: {cart ? cart.total_items : 0}</p>
        <p>Total Price: {cart && cart.subtotal && cart.subtotal.formatted_with_symbol}</p>
        < PayPalPayment cart={cart}/>
      </div>
    </PayPalScriptProvider>
  );
};

export default Cart;
