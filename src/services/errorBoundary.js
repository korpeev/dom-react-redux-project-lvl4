export const errorBoundary = (code) => {
  switch (code) {
    case 409:
      return 'errors.existUser';
    case 401:
      return 'errors.invalidCredentials';
    default:
      return 'errors.networkError';
  }
};
