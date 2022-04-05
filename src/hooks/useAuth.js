import axios from 'axios';
import { useAppContext } from '../context/AppContext.jsx';
import storage from '../utils/storage.js';

export default function useAuth() {
  const { setLoggedIn, setError, error } = useAppContext();

  const onSubmit = async (userData) => {
    try {
      const { data } = await axios.post('/api/v1/login', userData);
      storage.set('token', data.token);
      setLoggedIn(true);
    } catch (e) {
      setError({
        message: 'Invalid credentials',
        active: true,
      });
    }
  };

  return {
    onSubmit, error,
  };
}
