import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home.js';
import Buy from './components/pages/Buy.jsx';
import Sell from './components/pages/Sell.js';
import AddressForm from './components/CheckoutForm/AddressForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart/Cart';
import Checkout from './components/CheckoutForm/Checkout/Checkout';
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import db from './Firebase';

Amplify.configure(awsExports);

export function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [firestoreCartItems, setFirestoreCartItems] = useState([]);

  const fetchProducts = async () => {
    try {
      const productsRef = db.collection('product');
      const snapshot = await productsRef.get();
      const productsData = snapshot.docs.map((doc) => doc.data());
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products from Firestore: ', error);
    }
  };

  const fetchCart = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const cartItemsRef = db.collection('carts').doc(user.username).collection('cartItems');
      const snapshot = await cartItemsRef.get();
      const cartData = snapshot.docs.map((doc) => doc.data());
      let totalItems = 0;
      let totalPrice = 0;
      cartData.forEach((item) => {
        totalItems += parseInt(item.quantity) || 0; // Add the quantity of each item
        totalPrice += parseFloat(item.price) || 0; // Add the price of each item
      });
      setCart({
        line_items: cartData, // Adjust the structure based on your data
        total_items: totalItems, // Set the total items in the cart
        subtotal: { formatted_with_symbol: totalPrice.toFixed(2) }, // Set the total price in the cart
      });
    } catch (error) {
      console.error('Error fetching cart from Firestore: ', error);
    }
  };
  
  const handleFirestoreItemRemoval = async (itemId) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await db.collection('carts').doc(user.username).collection('cartItems').doc(itemId).delete();
      console.log('Document successfully deleted from Firestore cart!');
      fetchFirestoreCartItems(); // Fetch updated Firestore cart items after removal
    } catch (error) {
      console.error('Error removing document from Firestore cart: ', error);
    }
  };
  const fetchFirestoreCartItems = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const cartItemsRef = db.collection('carts').doc(user.username).collection('cartItems');
      const snapshot = await cartItemsRef.get();
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFirestoreCartItems(items);
    } catch (error) {
      console.error('Error fetching Firestore cart items: ', error);
    }
  };
  
  useEffect(() => {
    fetchProducts();
    fetchCart();
    fetchFirestoreCartItems();
  }, []);

  const handleAddToCart = async (productId, quantity) => {
    try {
      const productRef = db.collection('product').doc(productId);
      const productDoc = await productRef.get();
  
      if (productDoc.exists) {
        const productData = productDoc.data();
        const user = await Auth.currentAuthenticatedUser();
  
        await db.collection('carts').doc(user.username).collection('cartItems').add({
          productName: productData.name,
          price: productData.price,
          photo: productData.photoUrl,
        });
  
        console.log('Product added to the cart in Firestore');
      } else {
        console.error('Product not found in Firestore. Product ID:', productId);
      }
    } catch (error) {
      console.error('Error adding product to the cart in Firestore: ', error);
    }
  };
  const handleCheckout = () => {
    console.log('Checkout initiated');
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await db.collection('carts').doc(user.username).collection('cartItems').doc(itemId).delete();
      console.log('Document successfully deleted from Firestore cart');
      fetchFirestoreCartItems(); // Fetch updated Firestore cart items after removal
    } catch (error) {
      console.error('Error removing document from Firestore cart: ', error);
    }
  };

  return (
    <Router>
      <Navbar totalItems={cart.total_items} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy products={products} onAddToCart={handleAddToCart} />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/cart" element={<Cart cart={cart} onCheckout={handleCheckout} onRemoveFromCart={handleRemoveFromCart} firestoreCartItems={firestoreCartItems} onRemoveFCart={handleFirestoreItemRemoval} />} />
        <Route path="/review" element={<AddressForm cart={cart} />} />
      </Routes>
    </Router>
  );
}

export default withAuthenticator(App);

/* <>
<Router>
   <Navbar/>
   <Routes>
     <Route path='/' element = {<Home/>} />
     <Route path='/buy' element = {<Buy/>}/>
     <Route path='/sell' element = {<Sell/>}/>
     <Route path='/signIn' element = {<SignIn/>}/>
     </Routes>
   </Router>
   
  </> */


  // <div className="App">
  // {
  //   currentForm === "login" ? <Login onFormSwitch = {toggleForm}/> : <Register  onFormSwitch = {toggleForm}/>
  // }
 
  // </div>

// totalItems={cart.total_items}
//Buy products={products} onAddToCart={handleAddToCart}