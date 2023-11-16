import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Badge } from '@mui/material';
import Search from './pages/Search'; // Assuming the relative path is correct
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsExports from '../aws-exports';
import db from '../Firebase'; // Update the path to your Firebase file
import './Navbar.css';

Amplify.configure({
  ...awsExports,
  Auth: {
    mandatorySignIn: false,
  },
});

const Navbar = ({ user, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [totalItems, setTotalItems] = useState(0); // Define the totalItems state variable
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960 && showMenu) {
        setShowMenu(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showMenu]);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => {
        setLoggedIn(true);
      })
      .catch(() => {
        setLoggedIn(false);
      });
  }, []);

  const signOut = async () => {
    try {
      await Auth.signOut();
      setLoggedIn(false);
    } catch (error) {
      console.log('Error signing out', error);
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
    setSearchQuery('');
    navigate('/search-results'); // Navigate to the search results page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          CHY
        </Link>
        <div className={`nav-items ${showMenu ? 'active' : ''}`}>
          <Link to="/buy" className="nav-item">
            Buy
          </Link>
          <Link to="/sell" className="nav-item">
            Sell
          </Link>
          {loggedIn ? (
            <a onClick={signOut} className="nav-item">
              Sign Out
            </a>
          ) : (
            <Link to="/signin" className="nav-item">
              Sign in
            </Link>
          )}
        </div>
        <div className="search-container">
      <form onSubmit={handleSearch}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <SearchIcon />
          </button>
        </div>
      </form>
        </div>
      
        <Link to="/cart" className="nav-item">
          <IconButton aria-label="Show Cart Items" color="inherit">
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Link>
      </div>
    </nav>
  );
};

export default withAuthenticator(Navbar, { isSignedIn: true });