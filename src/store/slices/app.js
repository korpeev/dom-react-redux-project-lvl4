import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  isAuth: false,
  error: {
    text: '',
    isActive: false,
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUserName: (state, { payload }) => Object.assign(state, { username: payload }),
    setAuth: (state, { payload }) => Object.assign(state, { isAuth: payload }),
    setError: (state, { payload }) => Object.assign(state, { error: payload }),
    reset: (state) => Object.assign(state, initialState),
  },
});

export const {
  setAuth, setError, setUserName, reset,
} = appSlice.actions;
export default appSlice.reducer;
