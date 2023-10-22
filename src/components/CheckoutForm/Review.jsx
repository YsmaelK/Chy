import React from 'react';
import { Typography, Divider } from '@mui/material';

const Review = ({ shippingData }) => {
  if (!shippingData) return <div>Loading...</div>;

  const { firstName, lastName, email } = shippingData;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <Divider />
      {firstName && (
        <Typography variant="subtitle1" gutterBottom style={{ margin: '20px 0' }}>
          Name: {`${firstName} ${lastName}`}
        </Typography>
      )}
      {email && (
        <Typography variant="subtitle1" gutterBottom style={{ margin: '20px 0' }}>
          Email: {email}
        </Typography>
      )}
      {/* Add more summary details if needed */}
    </>
  );
};

export default Review;