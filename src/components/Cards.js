import React from 'react'
import CardItem from './CardItem'
import './Cards.css'
function Cards() {
  return (
    <div className='Cards'style={{ marginTop: '20px' }}>
        <h1>Featured</h1>
        <div className="cards__container">
            <div className="cards__wrapper">
                <ul className="cards__items">
                    <CardItem
                    src="images/uzi.jpg"
                    text="Search for an Event "
                    label='Search'
                    path='/search'
                    />
                    <CardItem
                    src="images/HardS.jpg"
                    text="Create an Account to Start Selling"
                    label='Sell'
                    path='/sell'
                    />
                    <CardItem
                    src="images/Steelers.jpg"
                    text="All Products"
                    label='Buy'
                    path='/buy'
                    />
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Cards