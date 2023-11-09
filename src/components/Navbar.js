import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton, Badge } from '@mui/material';
import { Amplify,Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsExports from '../aws-exports';
import db from '../Firebase'; // Update the path to your Firebase file

Amplify.configure({
  ...awsExports,
  Auth: {
    // Adjust the authentication configuration as needed
    mandatorySignIn: false, // Set to false to allow access to certain parts of the app without signing in
    // other Auth configurations
  },
  // other Amplify configurations
});

function Navbar({  user }) {
  const [loggedIn,setLoggedIn] = useState(false);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  useEffect(() => {
    AssessLoggedInState()
  }, [])
  const AssessLoggedInState= () =>{
    Auth.currentAuthenticatedUser().then(() => {
      setLoggedIn(true)

    }).catch(() =>{
      setLoggedIn(false);
    })
  }
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  const signOut = async () => {
    try {
      await Auth.signOut();
      setLoggedIn(false);
    } catch (error) {
      console.log('Error signing out', error);
    }
  };
  
  useEffect(() => {
    showButton();

    // Fetch the user's cart data from Firestore and calculate the total number of items
    const fetchCartItems = async () => {
      if (user) {
        const userCartRef = db.collection('users').doc(user.username).collection('cartItems');
        const snapshot = await userCartRef.get();
        let totalCount = 0;
        snapshot.forEach((doc) => {
          totalCount += doc.data().quantity;
        });
        setTotalItems(totalCount); // Set the total count of items in the state
      }
    };

    fetchCartItems();
  }, [user]);
  window.addEventListener('resize', showButton);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          CHY 
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? 'fas fa-x' : 'fas fa-bars'} />
        </div>
        <ul className="nav-list">
  <li className="nav-item">
    <Link to="/buy">Buy</Link>
  </li>
  <li className="nav-item">
    <Link to="/sell">{user.username}</Link>
  </li>
  <li className="nav-item">
    {loggedIn ? (
      <a onClick={signOut}>Sign Out</a>
    ) : (
      <Link to="/signin">Sign in</Link>
    )}
  </li>
</ul>

<Link to="/cart" onClick={handleClick}>
  <IconButton aria-label="Show Cart Items" color="inherit">
    <Badge badgeContent={totalItems} color="secondary">
      <ShoppingCartIcon />
    </Badge>
  </IconButton>
</Link>
      </div>
    </nav>
  );
}

export default withAuthenticator(Navbar, { isSignedIn: true });

