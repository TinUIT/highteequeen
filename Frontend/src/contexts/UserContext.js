import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    var item = {
        id: "",
        fullname:"",
        email:"",
        phone_number:"",
        address:"",
        image: "",
    }
    const [user, setUser] = useState(userInfo?userInfo:item);

  const updateUserProfile = (user) => {
    setUser((prevUser) => {
        prevUser=user;
  
        return user;
      });
  };
  

  return (
    <UserContext.Provider value={{ user, updateUserProfile }}>
    {children}
  </UserContext.Provider>
  );
};
