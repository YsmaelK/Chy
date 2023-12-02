// HeroSection.js
import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';

function HeroSection({ user }) {
  const handleAboutUsClick = () => {
    window.open('https://www.instagram.com/ysmael.kouam/', '_blank');
  };
  return (
    <div className='hero-container'>
      <h1>SickTixs </h1>
      <p>It's Party Time!</p>
      <div className="hero-btns">
        <a href={user ? "/profile" : "/profile"} className='btns btn--outline btn--large' style={{ textDecoration: 'none'}}>
          {user ? user.username : 'Profile'}
        </a>
        <a href="" className='btns btn--outline btn--large' onClick={handleAboutUsClick} style={{ textDecoration: 'none'}}>
          About Us <i className="fa-solid fa-circle-info"></i>
        </a>
      </div>
    </div>
  );
}

export default HeroSection;
