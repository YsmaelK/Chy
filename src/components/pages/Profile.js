import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { Typography } from '@mui/material';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await Auth.currentAuthenticatedUser();
        setUser(userData);
      } catch (error) {
        // If there's an error, leave the user state as null
        console.error('Error getting user data', error);
      }
    };

    getUserData();
  }, []);

  return (
    <div>
      <h2>Profile Page</h2>
      {user ? (
        <div>
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

