import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { Typography } from '@mui/material';
import './Profile.css'; // Import a separate CSS file for styling

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await Auth.currentAuthenticatedUser();
        setUser(userData);
      } catch (error) {
        console.error('Error getting user data', error);
      }
    };

    getUserData();
  }, []);

  return (
    <div className="profile-container">
      <h2>Your Profile </h2>
      {user ? (
        <div className="profile-info">
          <Typography variant="body1">Username: {user.username}</Typography>
          <Typography variant="body1">Email: {user.attributes.email}</Typography>
        </div>
      ) : (
        <Typography variant="body1">Not Signed In! Please Sign In</Typography>
      )}
    </div>
  );
};

export default Profile;
