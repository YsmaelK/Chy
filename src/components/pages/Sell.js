import React, { useState } from 'react';
import db from '../../Firebase';
import './Sell.css';

const Sell = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const handleAddProduct = async (event) => {
    event.preventDefault();

    try {
      await db.collection('product').add({
        name: productName,
        price: price,
        description: description,
        photoUrl: photoUrl,
      });
      console.log('Product added successfully!');
      setProductName('');
      setPrice('');
      setDescription('');
      setPhotoUrl('');
    } catch (error) {
      console.error('Error adding product to Firestore: ', error);
    }
  };

  const handleNameChange = (e) => {
    const input = e.target.value;
    if (input.length <= 10) {
      setProductName(input);
    }
  };

  return (
    <div className="sell-container">
      <h1>Add a Product</h1>
      <form className="sell-form" onSubmit={handleAddProduct}>
        <div className="sell-column">
          <input
            className="sell-input"
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={handleNameChange}
          />
          <input
            className="sell-input"
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <select
            className="sell-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
            <option value="">Select Description</option>
            <option value="concert">Concert</option>
            <option value="sport">Sport</option>
            <option value="event">Event</option>
          </select>
          <input
            className="sell-input"
            type="text"
            placeholder="Photo URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <button className="sell-button" type="submit">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default Sell;
