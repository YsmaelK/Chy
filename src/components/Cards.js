import React from 'react'
import CardItem from './CardItem'
import './Cards.css'
function Cards() {
  return (
    <div className='Cards'>
        <h1>Featured</h1>
        <div className="cards__container">
            <div className="cards__wrapper">
                <ul className="cards__items">
                    <CardItem
                    src="images/uzi.jpg"
                    text="Lil Uzi Vert "
                    label='Concert'
                    path='/services'
                    />
                    <CardItem
                    src="images/HardS.jpg"
                    text="Hard Summer"
                    label='Festival'
                    path='/services'
                    />
                    <CardItem
                    src="images/Steelers.jpg"
                    text="Steelers"
                    label='Sports'
                    path='/services'
                    />
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Cards