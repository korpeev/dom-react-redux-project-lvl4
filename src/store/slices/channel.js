import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: 1,
  selectedChannelId: 1,
  defaultChannelId: 1,
};

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = [...state.channels, ...action.payload];
    },
    renameChannel: (state, { payload }) => {
      const changedChannels = state.channels.map((c) => {
        if (c.id === payload.id) {
          return { ...c, name: payload.name };
        }
        return c;
      });

      state.channels = changedChannels;
    },
    removeChannel: (state, { payload: id }) => {
      if (state.currentChannelId === id) {
        state.currentChannelId = state.defaultChannelId;
      }
      const filteredChannels = state.channels
        .filter((channel) => channel.id !== id);
      state.channels = filteredChannels;
    },
    setCurrentChannelId: (state, { payload }) => ({ ...state, currentChannelId: payload }),
    setSelectedChannelId: (state, { payload }) => ({ ...state, selectedChannelId: payload }),
  },
});

export const {
  removeChannel, setCurrentChannelId, setChannels, setSelectedChannelId, renameChannel,
} = channelSlice.actions;
export default channelSlice.reducer;
