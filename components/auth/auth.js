import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/router';

export default function auth(WrappedComponent) {
    const Wrapper = (props) => {
        const router = useRouter();
    
        // Check if the user is authenticated, e.g., by checking if a token is present in localStorage or using an API call
        
        const isAuthenticated = JSON.parse(sessionStorage.getItem('data')) ?? JSON.parse(localStorage.getItem('data'))  // Your authentication logic here
    
        useEffect(() => {
          // If the user is not authenticated, redirect to the login page
          if (!isAuthenticated){
              router.push('/');
              document.getElementById('openLoginPopup')?.click();
          }
        }, [isAuthenticated, router]);
    
        // If the user is authenticated, render the wrapped component
        return isAuthenticated ? <WrappedComponent {...props} /> : null;
      };
      
  return Wrapper
}
