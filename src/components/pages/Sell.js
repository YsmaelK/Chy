import React, { useState } from 'react';
import db from '../../Firebase';
import './Sell.css';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Import the LocationOnIcon from Material-UI Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Import the AccessTimeIcon from Material-UI Icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CelebrationIcon from '@mui/icons-material/Celebration';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LinkIcon from '@mui/icons-material/Link';
import { Auth } from 'aws-amplify';
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
  const [isFree, setIsFree] = useState(false);
  const [socialMediaLink, setSocialMediaLink] = useState('');
  // ... existing state declarations

  const handleFreeButtonClick = () => {
    setIsFree(!isFree);
  };
  const today = new Date();
  const formattedToday = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;

  const handleAddProduct = async (event) => {
    event.preventDefault();

    if (!productName  || !description || !date || !loc || !time) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!isValidDate(date) || !isValidTime(time)) {
      setError('Please enter a valid date (xx/xx/xxxx) and time (xx:xx).');
      return;
    }

    try {
      const user = await Auth.currentAuthenticatedUser();

      await db.collection('product').add({
        name: productName,
        price: price,
        description: description,
        photoUrl: photoUrl,
        date: formatDate(date),
        loc: loc,
        time: formatTime(time),
        info: info,
        social: socialMediaLink,
        username: user.username,

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
    if (input.length <= 11) {
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
      <div className="form-container">
      <h1>Add a Product</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="sell-form" onSubmit={handleAddProduct}>
        <div className="sell-column">
        <div className="name-input">
            <span className="icon">
              <CelebrationIcon />
            </span>
            <input
              className="sell-input"
              type="text"
              placeholder="Product Name*"
              value={productName}
              onChange={handleNameChange}
            />
          </div>
             <div className="price-input">
            <div className="price-wrapper">
            <AttachMoneyIcon className="dollar-sign" />
                  <input
                className="sell-input"
                type="text"
                placeholder="0"
                value={isFree ? '0' : price}
                onChange={(e) => {
                  if (!isFree) {
                    setPrice(e.target.value);
                  }
                }}
              />
              <span className="cents">.00</span>
            </div>
            <div className="centered-button-container">
                <button
                  className={`option-button ${isFree ? 'centered' : ''}smaller-button`} // Use a conditional class for centering
                  type="button"
                  onClick={handleFreeButtonClick}
                >
                  It's Free
                </button>
              </div>
          </div>
          <div className="description-input">
              <span className="question-icon">
                <HelpOutlineIcon />
              </span>
              <select
                className="sell-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              >
                <option value="" disabled>
                  What are you Selling*
                </option>
                <option value="concert">Concert</option>
                <option value="sport">Sport</option>
                <option value="event">Event</option>
              </select>
            </div>
          <div className="date-input">
            <span className="calendar-icon">
              <EventIcon />
            </span>
            <input
              className="sell-input"
              type="text"
              placeholder={`Date (${formattedToday})*`}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            
          </div>
          <div className="time-input">
            <span className="time-icon">
              <AccessTimeIcon />
            </span>
            <input
              className="sell-input"
              type="text"
              placeholder="Time (xx:xx)*"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="location-input">
            <span className="location-icon">
              <LocationOnIcon />
            </span>
            <input
              className="sell-input"
              type="text"
              placeholder="Location*"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
            />
          </div>
          <div className="description-textarea">
          <span className="description-icon">
                <DescriptionIcon />
              </span>
          <textarea
            className="sell-textarea"
            placeholder="Description"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          ></textarea>
          </div>
          <div className="photo-input">
              <span className="camera-icon">
                <CameraAltIcon />
              </span>
              <input
                className="sell-input"
                type="text"
                placeholder="Photo URL"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>
            <div className="social-media-input">
              <span className="link-icon">
                <LinkIcon />
              </span>
              <input
                className="sell-input"
                type="text"
                placeholder="Social Media Link"
                value={socialMediaLink}
                onChange={(e) => setSocialMediaLink(e.target.value)}
              />
            </div>
          <button className="sell-button" type="submit">
            Add Product
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Sell;