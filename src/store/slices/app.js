import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  isAuth: false,
  error: {
    text: '',
    isActive: false,
  },
  modal: {
    type: null,
    active: null,
    status: 'idle',
    title: '',
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
    setModal: (state, { payload }) => ({ ...state, modal: { ...state.modal, ...payload } }),
  },
});

export const {
  setAuth, setError, setUserName, reset, setModal,
} = appSlice.actions;
export default appSlice.reducer;
