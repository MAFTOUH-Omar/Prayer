import React from 'react'
import Cookies from 'js-cookie'
import { createContext,useEffect,useState } from 'react'
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

const AuthProvider  = ({children}) => {
  const [token , SetToken] = useState(()=>Cookies.get('x-auth') || '' )
  const [loading , SetLoding] = useState(true);
  const [fullName , SetFullName] = useState(()=>Cookies.get('Full_Name') || '' );
  const [picture , SetPicture] = useState(()=>Cookies.get('picture') || '' );

  const Logout = () =>{
    SetFullName('');
    SetPicture('');
    SetToken('');
    Cookies.remove('x-auth', { path: '/' })
  }
  function isTokenValid() {
    try {
      const decodedToken = jwt_decode(token);
      return !decodedToken.exp || decodedToken.exp > Date.now() / 1000;
    } catch (error) {
        Logout()
    }
    SetLoding(false)
  }

  useEffect(()=>{
    if (token !== undefined && token !== "") isTokenValid();
    else SetLoding(false)
  },[token])


  return (
    <AuthContext.Provider value={{ Logout , token , fullName , picture , loading , isTokenValid }}>
        {children}
    </AuthContext.Provider>
  )
}

export {AuthProvider , AuthContext}