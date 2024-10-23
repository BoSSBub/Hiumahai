import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(() => {
    const savedUser = localStorage.getItem('userDetails');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [lastAction, setLastAction] = useState(null); // State to store last action

  useEffect(() => {
    if (userDetails) {
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
    } else {
      localStorage.removeItem('userDetails');
    }
  }, [userDetails]);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails, lastAction, setLastAction }}>
      {children}
    </UserContext.Provider>
  );
};
