// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(() => {
    // Try to load from localStorage if available
    const savedUser = localStorage.getItem('userDetails');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save to localStorage whenever userDetails changes
  useEffect(() => {
    if (userDetails) {
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
    } else {
      localStorage.removeItem('userDetails'); // Remove when user logs out or is null
    }
  }, [userDetails]);

  console.log(userDetails);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
