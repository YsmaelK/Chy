import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Badge } from '@mui/material';
import Search from './pages/Search';
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsExports from '../aws-exports';
import db from '../Firebase';
import './Navbar.css';

const Navbar = ({ user, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [totalItems, setTotalItems] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log('User is logged in:', user);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log('User is not logged in:', error);
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
    navigate('/search-results');
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
          {loggedIn && (
            <Link to="/sell" className="nav-item">
              Sell
            </Link>
          )}
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
        {/* <Link to="/cart" className="nav-item-cart">
          <IconButton aria-label="Show Cart Items" color="inherit">
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Link> */}
        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          {showMenu ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`nav-menu-mobile ${showMenu ? 'active' : ''}`}>
        <Link to="/buy" className="nav-link-mobile">
          Buy
        </Link>
        {loggedIn && (
          <Link to="/sell" className="nav-link-mobile">
            Sell
          </Link>
        )}
        {loggedIn ? (
          <a onClick={signOut} className="nav-link-mobile">
            Sign Out
          </a>
        ) : (
          <Link to="/signin" className="nav-link-mobile">
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
