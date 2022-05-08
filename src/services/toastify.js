import { toast } from 'react-toastify';

export const toastify = (msg = '', type = 'success') => {
  const getStateByType = {
    success: 'success',
    warning: 'warning',
    error: 'error',
  };
  toast(msg, { type: getStateByType[type] });
};
