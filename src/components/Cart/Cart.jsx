import React from 'react';
import { Link } from 'react-router-dom';
const Cart = ({ cart, onCheckout, onRemoveFromCart }) => {
  const handleCheckout = () => {
    console.log('Checkout initiated:', cart.line_items); // Save the product to the console
    // Add any additional logic for checkout here
    onCheckout(); // Call the onCheckout function if necessary
  };

  return (
    <div className="cart">
      <h1>Your Shopping Cart</h1>
      {cart.line_items ? (
        cart.line_items.map((item) => (
          <div key={item.id} className="cart-item">
            <h3>{item.name}</h3>
            <p>Price: {item.price.formatted_with_symbol}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => onRemoveFromCart(item.id)}>Remove from Cart</button> {/* Remove from Cart button */}
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
      <h2>Cart Summary</h2>
      <p>Total Items: {cart.total_items}</p>
      <p>Total Price: {cart.subtotal && cart.subtotal.formatted_with_symbol}</p>
      <Link to="/review">
        <button onClick={handleCheckout}>Checkout</button> {/* Checkout button */}
      </Link>
    </div>
  );
};

export default Cart;