import React, { useState } from 'react';
import db from '../../Firebase';
import './Sell.css';

const Sell = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [date, setDate] = useState('');
  const [loc, setLoc] = useState('');
  const [time, setTime] = useState('');
  const [info, setInfo] = useState('');
  const [error, setError] = useState('');

  const handleAddProduct = async (event) => {
    event.preventDefault();

    if (!productName || !price || !description || !date || !loc || !time) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!isValidDate(date) || !isValidTime(time)) {
      setError('Please enter a valid date (xx/xx/xxxx) and time (xx:xx).');
      return;
    }

    try {
      await db.collection('product').add({
        name: productName,
        price: price,
        description: description,
        photoUrl: photoUrl,
        date: formatDate(date),
        loc: loc,
        time: formatTime(time),
        info: info,
      });
      console.log('Product added successfully!');
      setProductName('');
      setPrice('');
      setDescription('');
      setPhotoUrl('');
      setDate('');
      setLoc('');
      setTime('');
      setInfo('');
      setError('');
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

  const isValidDate = (inputDate) => {
    return /^\d{2}\/\d{2}\/\d{4}$/.test(inputDate);
  };

  const isValidTime = (inputTime) => {
    return /^\d{2}:\d{2}$/.test(inputTime);
  };

  const formatDate = (inputDate) => {
    const dateArray = inputDate.split('/');
    const day = ('0' + dateArray[1]).slice(-2);
    const month = ('0' + dateArray[0]).slice(-2);
    const year = dateArray[2];
    return `${month}/${day}/${year}`;
  };

  const formatTime = (inputTime) => {
    const timeArray = inputTime.split(':');
    const hours = ('0' + timeArray[0]).slice(-2);
    const minutes = ('0' + timeArray[1]).slice(-2);
    return `${hours}:${minutes}`;
  };

  return (
    <div className="sell-container">
      <h1>Add a Product</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="sell-form" onSubmit={handleAddProduct}>
        <div className="sell-column">
          <input
            className="sell-input"
            type="text"
            placeholder="Product Name*"
            value={productName}
            onChange={handleNameChange}
          />
          <input
            className="sell-input"
            type="text"
            placeholder="Price*"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <select
            className="sell-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
            <option value="">What are you Selling*</option>
            <option value="concert">Concert</option>
            <option value="sport">Sport</option>
            <option value="event">Event</option>
          </select>
          <input
            className="sell-input"
            type="text"
            placeholder="Date (xx/xx/xxxx)*"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            className="sell-input"
            type="text"
            placeholder="Location*"
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
          />
          <input
            className="sell-input"
            type="text"
            placeholder="Time (xx:xx)*"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <textarea
            className="sell-textarea"
            placeholder="Additional Information"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          ></textarea>
          <input
            className="sell-input"
            type="text"
            placeholder="Photo URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <button className="sell-button" type="submit">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Sell;
