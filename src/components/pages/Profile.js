import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Button } from '@mui/material';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await Auth.currentAuthenticatedUser();
        console.log('User Data:', userData);
        setUser(userData);
      } catch (error) {
        console.error('Error getting user data', error);
      }
    };
  
    getUserData();
  }, []);
  return (
    <div>
      <h2>Profile Page</h2>
      {user && (
        <div>
           <Typography variant="body1">Username: {user.username}</Typography>
          <Typography variant="body1">Email: {user.attributes.email}</Typography>
        </div>
      )}
    </div>
  );
};

export default Profile;
