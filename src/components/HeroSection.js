// HeroSection.js
import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { withAuthenticator } from '@aws-amplify/ui-react';

function HeroSection({ user }) {
  return (
    <div className='hero-container'>
      <h1>BUY MY SHIT </h1>
      <p>DO IT!</p>
      <div className="hero-btns">
        <Button
          to="/profile"
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          {user ? user.username : 'Guest'}
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

export default withAuthenticator(HeroSection, { isSignedIn: true });
