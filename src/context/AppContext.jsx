import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext({
  isLoggedIn: false,
  setLoggedIn: () => {},
  error: {
    active: true,
    message: '',
  },
  setError: () => {},
  user: null,
});
export default function AppProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState({
    active: true,
    message: '',
  });
  return (
    <AppContext.Provider value={{
      isLoggedIn, setLoggedIn, user: null, error, setError,
    }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const {
    setLoggedIn, isLoggedIn, user, error, setError,
  } = useContext(AppContext);
  return {
    setLoggedIn, isLoggedIn, user, error, setError,
  };
}
