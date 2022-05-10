import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import storage from '../utils/storage.js';
import { getAppState } from '../selectors/index.js';
import { setAuth } from '../store/slices/app.js';

export default function RequireAuth({ children }) {
  const { isAuth } = useSelector(getAppState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (storage.get('token')) {
      dispatch(setAuth(true));
    }
  }, []);
  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
}
