import React, { useState, useEffect } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import awsExports from '../../aws-exports';
import { Afterpay, CreditCard } from 'react-square-web-payments-sdk';
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

  const calculateSubtotal = () => {
    if (cart.line_items && cart.line_items.length > 0) {
      const subtotal = cart.line_items.reduce((total, item) => total + parseFloat(item.price), 0);
      return (subtotal * 100).toFixed(0); // Multiply by 100 and round to the nearest integer
    }
    return '0.00';
  };

  // Function to create payment request for digital wallets
  const createPaymentRequest = () => {
    return {
      requestPayerName: true,
      requestPayerEmail: true,
      requestPayerPhone: true,
      requestShipping: true,
      shippingType: 'delivery', // Specify your desired shipping type
      currencyCode: 'USD', // Specify your currency code
      countryCode: 'US', // Specify your country code
      total: {
        label: 'Total Amount',
        amount: {
          currency: 'USD',
          value: '100.00', // Replace with your actual total amount
        },
      },
    };
  };

  // Function to handle digital wallet payment response
  const handleDigitalWalletPayment = async (token, buyer) => {
    alert(JSON.stringify(token, null, 2));
    // Handle digital wallet payment response, e.g., send to your server
  };

  return (
    <div>
      {user && (
        <div>
          <h2>Review</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.attributes.email}</p>
        </div>
      )}

      {cart.line_items ? (
        cart.line_items.map((item, index) => (
          <div key={index} className="cart-item">
            <p>{item.productName}</p>
            <p>
              Price: {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : `$${parseFloat(item.price).toFixed(2)}`}
            </p>
          </div>
        ))
      ) : (
        <p>No items in cart</p>
      )}

      <p>Subtotal: ${parseFloat(calculateSubtotal() / 100).toFixed(2)}</p>

      <h2>Payment Method</h2>
      <div>
        {/* AfterpayProvider with CreditCard component for Square digital wallet */}
        <Afterpay
           applicationId="sandbox-sq0idb-sOid9g_9zUFVFEA_on_j6Q"
           locationId="LEZPYMWC6TX2T"
           createPaymentRequest={createPaymentRequest} // Pass the createPaymentRequest function
           cardTokenizeResponseReceived={async (token, buyer) => {
             alert(JSON.stringify(token, null, 2));
           }}
        >
          <CreditCard />
        </Afterpay>
      </div>
    </div>
  );
};

export default AddressForm;
