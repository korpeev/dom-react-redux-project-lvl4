import axios from 'axios';
import { useTranslation } from 'react-i18next';
import storage from '../utils/storage.js';
import { setAuth, setError, setUserName } from '../store/slices/app.js';

export default function useAuth(dispatch, endpoint = '/api/v1/login') {
  const { t } = useTranslation();
  const onSubmit = async (userData) => {
    try {
      const { data } = await axios.post(endpoint, userData);
      storage.set('token', data.token);
      storage.set('username', userData.username);
      dispatch(setUserName(userData.username));
      dispatch(setAuth(true));
      dispatch(setError({ text: '', type: '', isActive: false }));
    } catch (e) {
      const { status } = e.response;
      let message = '';
      if (status === 409) {
        message = t('errors.userExists');
      } else if (status === 401) {
        message = t('errors.invalidCredentials');
      }
      console.log(message);
      dispatch(setError({
        text: message,
        type: 'auth',
        isActive: true,
      }));
    }
  };

  return { onSubmit };
}
