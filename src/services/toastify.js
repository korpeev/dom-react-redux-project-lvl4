import { toast } from 'react-toastify';

export const toastify = (msg = '', type = 'success') => {
  const getStateByType = {
    success: 'success',
    warning: 'warning',
    error: 'error',
  };
  console.log(getStateByType[type]);
  toast(msg, { type: getStateByType[type] });
};
