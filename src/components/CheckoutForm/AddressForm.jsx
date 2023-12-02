// import React, { useState, useEffect } from 'react';
// import { Amplify, Auth } from 'aws-amplify';
// import awsExports from '../../aws-exports';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, ElementsConsumer,useElements, useStripe } from '@stripe/react-stripe-js';
// import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Button } from '@mui/material';
// import StripeCheckout from 'react-stripe-checkout'
// import axios from 'axios'
// Amplify.configure(awsExports);
// const stripePromise = loadStripe('pk_test_51O8DXGKvrB6fpE6lEKSleVz2fJGfTfLNnrgQtNio9fPPblJPnSaCQFcPRmVkPfaKqd1SEQDIlOh48Z62cQdwD2ut00BzvMxTht');

// const CheckoutForm = () => {
  

//   const stripe = useStripe();
//   const elements = useElements();

//   const [paymentError, setPaymentError] = useState(null);
//   const [paymentSuccess, setPaymentSuccess] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!stripe || !elements) {
//       return;
//     }
  
//     const cardElement = elements.getElement(CardElement);
  
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     });
  
//     if (error) {
//       setPaymentError(error.message);
//       setPaymentSuccess(null);
//     } else {
//       setPaymentSuccess(paymentMethod.id);
//       setPaymentError(null);
  
//       // Send the paymentMethod.id to your server to complete the payment
//       try {
//         const response = await fetch('/review', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
//         });
  
//         if (response.ok) {
//           console.log('Payment processed successfully');
//         } else {
//           console.error('Failed to process payment');
//         }
//       } catch (error) {
//         console.error('Error sending payment details to server:', error);
//       }
//     }
//   };
  

//   return (
//    <div>hi</div>
//   );
// };


// const AddressForm = ({ cart }) => {
//   const publishableKey = 'pk_test_51O8DXGKvrB6fpE6lEKSleVz2fJGfTfLNnrgQtNio9fPPblJPnSaCQFcPRmVkPfaKqd1SEQDIlOh48Z62cQdwD2ut00BzvMxTht'
//   const [user, setUser] = useState(null);
//   const [paymentComplete, setPaymentComplete] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const userData = await Auth.currentAuthenticatedUser();
//         setUser(userData);
//       } catch (error) {
//         console.error('Error fetching user: ', error);
//       }
//     };

//     fetchUser();
//   }, []);

//   // Calculate the subtotal
//   const calculateSubtotal = () => {
//     if (cart.line_items && cart.line_items.length > 0) {
//       const subtotal = cart.line_items.reduce((total, item) => total + parseFloat(item.price), 0);
//       return (subtotal * 100).toFixed(0); // Multiply by 100 and round to the nearest integer
//     }
//     return '0.00';
//   };
//   const priceForStripe = calculateSubtotal();
//   const payNow = async token =>{
//    try{
//       const response = await axios({
//         url:'http://localhost:3000/review',
//         method:'post',
//         data: {
//           amount: calculateSubtotal,
//           token,
//         }
//       });
//       if(response.status == 200){
//         console.log('Your Payment Was Successful');
//       }
//    } catch(error){
//     console.log(error)
//    } 
//   }
//   return (
//     <div>
//       {user && (
//         <div>
//           <h2>Review</h2>
//           <Typography variant="body1">Username: {user.username}</Typography>
//           <Typography variant="body1">Email: {user.attributes.email}</Typography>
//         </div>
//       )}

//       {cart.line_items ? (
//         cart.line_items.map((item, index) => (
//           <div key={index} className="cart-item">
//             <Typography variant="h6">{item.productName}</Typography>
//             <Typography variant="body1">
//               Price:{' '}
//               {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : `$${parseFloat(item.price).toFixed(2)}`}
//             </Typography>
//           </div>
//         ))
//       ) : (
//         <Typography variant="body1" key="no-items">
//           No items in cart
//         </Typography>
//       )}

//       <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
//       Subtotal: ${parseFloat(calculateSubtotal() / 100).toFixed(2)}
//       </Typography>

//       <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
//         Payment Method
//       </Typography>
//       <StripeCheckout
//     stripeKey= {publishableKey}
//     label = "Pay Now"
//     name= "Pay With Credit Card"
//     billingAddress
//     amount = {calculateSubtotal}
//     description={`Your total is $${parseFloat(calculateSubtotal() / 100).toFixed(2)}`}
//     token={payNow}
//     ></StripeCheckout>
//     </div>
//   );
// };

// export default AddressForm;