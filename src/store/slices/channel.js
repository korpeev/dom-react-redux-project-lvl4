import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: 1,
};

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels.push(...action.payload);
    },
    removeChannel: (state, { payload: id }) => state.channels.filter((channel) => channel.id !== id),
    setCurrentChannelId: (state, { payload }) => ({ ...state, currentChannelId: payload }),
    reset: (state) => ({ ...state, ...initialState }),
  },
});

export const {
  removeChannel, reset, setCurrentChannelId, setChannels,
} = channelSlice.actions;
export default channelSlice.reducer;
