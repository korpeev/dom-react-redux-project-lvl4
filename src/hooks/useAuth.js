import axios from 'axios';
import storage from '../utils/storage.js';
import { setAuth, setError, setUserName } from '../store/slices/app.js';

export default function useAuth(dispatch) {
  const onSubmit = async (userData) => {
    try {
      const { data } = await axios.post('/api/v1/login', userData);
      storage.set('token', data.token);
      console.log(userData.username);
      dispatch(setUserName(userData.username));
      dispatch(setAuth(true));
      dispatch(setError({ text: '', isActive: false }));
    } catch (e) {
      dispatch(setError({
        text: 'invalid credentials',
        isActive: true,
      }));
    }
  };

  return { onSubmit };
}
