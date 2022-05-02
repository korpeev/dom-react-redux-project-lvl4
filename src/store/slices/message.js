import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { filterBadWords } from 'services/filterBadWords.js';

export const sendMessage = createAsyncThunk('message/sendMessage', async ({ messageData, createEmit, resetForm }) => {
  try {
    await createEmit('newMessage', { ...messageData });
    resetForm();
  } catch (e) {
  }
});

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, { payload }) => {
      state.messages.push(filterBadWords(payload));
    },
    fetchedMessages: (state, { payload }) => {
      state.messages = filterBadWords(payload);
    },
    removeMessages: (state, { payload }) => {
      state.messages = state.messages.filter((m) => m.channelId !== payload);
    },
  },
});

export const { setMessages, fetchedMessages, removeMessages } = messageSlice.actions;
export default messageSlice.reducer;
