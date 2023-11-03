import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton, Badge } from '@mui/material';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsExports from '../aws-exports';
import db from '../Firebase'; // Update the path to your Firebase file

Amplify.configure(awsExports);

function Navbar({ signOut, user }) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
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
        <ul className={click ? 'nav-menu active' : 'nav menu'}>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="/buy">Buy</a>
            </li>
            <li className="nav-item">
              <a href="/sell">{user.username}</a>
            </li>
            <li className="nav-item">
              <a onClick={signOut}>Sign Out</a>
            </li>
          </ul>
        </ul>
        <a href="/cart" onClick={handleClick}>
          <IconButton aria-label="Show Cart Items" color="inherit">
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </a>
      </div>
    </nav>
  );
}

export default withAuthenticator(Navbar);

