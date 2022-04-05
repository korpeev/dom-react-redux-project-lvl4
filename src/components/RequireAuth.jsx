import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import storage from '../utils/storage.js';
import { useAppContext } from '../context/AppContext.jsx';

export default function RequireAuth({ children }) {
  const { isLoggedIn, setLoggedIn } = useAppContext();
  const location = useLocation();
  useEffect(() => {
    if (storage.get('token')) {
      setLoggedIn(true);
    }
  }, [isLoggedIn]);
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
