import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import storage from '../utils/storage.js';
import { getAppState } from '../selectors/index.js';
import { setAuth } from '../store/slices/app.js';

export default function RequireAuth({ children }) {
  const { isAuth } = useSelector(getAppState);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (storage.get('token')) {
      dispatch(setAuth(true));
    }
  }, [isAuth]);
  console.log(location.pathname);
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
