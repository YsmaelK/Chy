import React from 'react';
import { Link } from 'react-router-dom';
import db from '../../Firebase';
import { Card, CardContent, Typography } from '@mui/material';

const Cart = ({ cart, onCheckout, onRemoveFromCart, firestoreCartItems, onRemoveFCart }) => {
  const handleCheckout = () => {
    console.log('Checkout initiated:', cart.line_items);
    onCheckout();
  };

  return (
    <div className="cart">
      <h1>Your Shopping Cart</h1>

      {firestoreCartItems.length ? (
  <div>
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
      <Link to="/review">
        <button onClick={handleCheckout}>Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
