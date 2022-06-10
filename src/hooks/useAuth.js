import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import storage from '../utils/storage';
import { setAuth, setError, setUserName } from '../store/slices/app';
import { errorBoundary } from '../services/errorBoundary';
import { useState } from 'react';

export default function useAuth(dispatch, endpoint = '/api/v1/login') {
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = async (userData) => {
    try {
      setSubmitting(true);
      const { data } = await axios.post(endpoint, userData);
      storage.set('token', data.token);
      storage.set('username', userData.username);
      dispatch(setUserName(userData.username));
      dispatch(setAuth(true));
      dispatch(setError({ text: '', isActive: false }));
      navigate('/', { replace: true, state: { from: location } });
    } catch (e) {
      const { status } = e.response;
      dispatch(
        setError({
          text: errorBoundary(status),
          isActive: true,
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

  return { onSubmit, submitting };
}
