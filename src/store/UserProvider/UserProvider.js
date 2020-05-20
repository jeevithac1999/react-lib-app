import React, { createContext, useState } from "react";

const isUserLoggedIn = false;

export const userContext = createContext(isUserLoggedIn);

const { Provider } = userContext;

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn);

  const loginUser = () => setIsLoggedIn(true);
  const logoutUser = () => setIsLoggedIn(false);

  return (
    <Provider
      value={{
        isUserLoggedIn: isLoggedIn,
        setUserLoggedIn: loginUser,
        setUserLoggedOut: logoutUser
      }}
    >
      {children}
    </Provider>
  );
};

export default UserProvider;
