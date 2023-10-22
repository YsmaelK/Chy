import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home.js';
import Buy from './components/pages/Buy.jsx';
import Sell from './components/pages/Sell.js';
import AddressForm from './components/CheckoutForm/AddressForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { commerce } from './lib/commerce';
import Cart from './components/Cart/Cart';
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

export function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  console.log(cart);

  const handleAddToCart = async (productId, quantity) => {
    await commerce.cart.add(productId, quantity);
    fetchCart();
  };
  const handleCheckout = () => {
    // Add your checkout logic here
    console.log('Checkout initiated');
  };
  const handleRemoveFromCart = async (lineItemId) => {
    // Implement the logic to remove an item from the cart using Commerce.js or any other relevant method
    await commerce.cart.remove(lineItemId);
    fetchCart(); // Fetch the updated cart data after removing the item
  };



  return (
    <Router>
      <Navbar totalItems={cart.total_items} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy products={products} onAddToCart={handleAddToCart} />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/cart" element={<Cart cart={cart} onCheckout={handleCheckout}  onRemoveFromCart={handleRemoveFromCart}/>} />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
        <Route path= "/review" element = {<AddressForm cart={cart}/>}/>
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