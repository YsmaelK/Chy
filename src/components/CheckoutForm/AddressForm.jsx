import React, { useState, useEffect } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import awsExports from '../../aws-exports';

Amplify.configure(awsExports);

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

  return (
    <div>
      {user && (
        <div>
          <h2>User Information</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.attributes.email}</p>
        </div>
      )}
      <h2>Cart Items</h2>
      {cart.line_items ? (
        cart.line_items.map((item) => (
          <div key={item.id} className="cart-item">
            <h3>{item.name}</h3>
            <p>Price: {item.price.formatted_with_symbol}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))
      ) : (
        <p>No items in cart</p>
      )}
    </div>
  );
};

export default AddressForm;
