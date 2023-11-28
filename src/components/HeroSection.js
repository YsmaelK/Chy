// HeroSection.js
import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom


function HeroSection({ user }) {
  return (
    <div className='hero-container'>
      <h1>CHY </h1>
      <p>It's Party Time!</p>
      <div className="hero-btns">
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          // Add an onClick handler to navigate to the profile page
          onClick={() => user ? window.location.href = "/profile" : window.location.href = "/profile"}
        >
          {user ? user.username : 'Profile'}
        </Button>
        <Button
          to="/about"
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          About Us <i className="fa-solid fa-circle-info"></i>
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;