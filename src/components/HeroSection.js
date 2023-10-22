import React from 'react'
import '../App.css';
import {Button} from './Button';
import './HeroSection.css';
function HeroSection() {
  return (
    <div className='hero-container'>
        
        <h1>BUY MY SHIT </h1>
        <p>DO IT!</p>
        <div className="hero-btns">
            <Button 
            className='btns' 
            buttonStyle='btn--outline'
            buttonSize='btn--large'
            >
                GET STARTED 
            </Button>
            <Button 
            className='btns' 
            buttonStyle='btn--primary'
            buttonSize='btn--large'
            >
               About Us <i className="fa-solid fa-circle-info"></i>
            </Button>
        </div>
    </div>
  )
}

export default HeroSection