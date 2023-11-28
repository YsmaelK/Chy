import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate  } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';

const SignIn = () => {
    const navigate = useNavigate();
    const handleGoToHomePage = () => {
        // Redirect to the home page
        navigate('/');
        window.location.reload();
      };
  return (
    <div>
    <button onClick={handleGoToHomePage}>Hello</button>
    </div>
  );
};

export default withAuthenticator(SignIn);