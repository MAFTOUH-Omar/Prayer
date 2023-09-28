import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GoogleAuth from './GoogleAuth/AuthComponent';
import Header from './Header/Header';
import reportWebVitals from './reportWebVitals';
import Cookies from 'js-cookie';
import { AuthProvider } from "./contexts/AuthContext";
const root = ReactDOM.createRoot(document.getElementById('root'));
const token = Cookies.get('x-auth');
root.render(
  <React.StrictMode>
    <AuthProvider>
      {
        token ? <Header/> : <GoogleAuth/>
      }
    </AuthProvider>
   </React.StrictMode>
);

reportWebVitals();
