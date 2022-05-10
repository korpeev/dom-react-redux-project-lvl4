import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import storage from '../utils/storage';
import { setAuth, setError, setUserName } from '../store/slices/app';
import { errorBoundary } from '../services/errorBoundary';

export default function useAuth(dispatch, endpoint = '/api/v1/login') {
  const navigate = useNavigate();
  const location = useLocation();
  const onSubmit = async (userData) => {
    try {
      const { data } = await axios.post(endpoint, userData);
      storage.set('token', data.token);
      storage.set('username', userData.username);
      dispatch(setUserName(userData.username));
      dispatch(setAuth(true));
      dispatch(setError({ text: '', isActive: false }));
      navigate('/', { replace: true, state: { from: location } });
    } catch (e) {
      const { status } = e.response;
      dispatch(setError({
        text: errorBoundary(status),
        isActive: true,
      }));
    }
  };

  return { onSubmit };
}
