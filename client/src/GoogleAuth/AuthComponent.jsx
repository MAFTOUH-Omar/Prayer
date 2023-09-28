import React, { useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';
// import { useNavigate } from "react-router-dom";

function AuthComponent() {
  // const navigate = useNavigate(); // Initialize the useNavigate hook
  const clientId = "143849907077-bb2k82l6hnra7piuuiimhknulgs2tm0k.apps.googleusercontent.com";

  const handleSuccess = (response) => {
    const decodedToken = jwt_decode(response.credential);

    Cookies.set('x-auth', response.credential, { expires: 10 });
    Cookies.set('clientId', response.clientId);
    Cookies.set('Full_Name', decodedToken.name);
    Cookies.set('picture', decodedToken.picture);
    console.log('Successful login:', decodedToken);
    window.location.reload();
    // Use navigate to redirect to the "/home" route after a successful login
    // navigate("/home");
  };

  const handleFailure = (error) => {
    console.error('Login failed:', error);
  };

  useEffect(()=>{
    document.title = "Authentification";
  },[])

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className='flex justify-center h-screen items-center'>
        <GoogleLogin
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default AuthComponent;
