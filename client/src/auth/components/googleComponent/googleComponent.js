import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../ContextComponent/ContextComponent';

const GoogleComponent = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(UserContext);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    console.log("URL Search Params:", window.location.search);

    const receivedToken = query.get('token'); // Get the 'token' from URL
    console.log("Received token:", receivedToken);

    if (receivedToken) {
      console.log("Setting token in localStorage and UserContext");
      localStorage.setItem('token', receivedToken); // Store token in localStorage
      setToken(receivedToken); // Set token in UserContext
      navigate('/home');
    } else {
      console.log("No token found");
      navigate('/login');
    }
  }, [navigate, setToken]);

  return (
    <div>
      <p>Processing authentication...</p>
    </div>
  );
};

export default GoogleComponent;
