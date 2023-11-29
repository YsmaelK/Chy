import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';

const SignIn = () => {
  const navigate = useNavigate();

  const handleGoToHomePage = () => {
    // Redirect to the home page
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Check if the user is already signed in
        const user = await Auth.currentAuthenticatedUser();
        if (user) {
          // If the user is signed in, redirect to the home page
          handleGoToHomePage();
        }
      } catch (error) {
        // User is not signed in, do nothing
      }
    };

    checkUser();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <button onClick={handleGoToHomePage}>Hello</button>
    </div>
  );
};

export default withAuthenticator(SignIn);