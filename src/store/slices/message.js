import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import filter from 'leo-profanity';

filter.getDictionary('ru');
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
      const messageData = {
        ...payload,
        text: filter.check(payload.text) ? filter.clean(payload.text, '*', 3) : payload.text,
      };
      state.messages.push(messageData);
    },
    fetchedMessages: (state, { payload }) => {
      state.messages = payload;
    },
    removeMessages: (state, { payload }) => {
      state.messages = state.messages.filter((m) => m.channelId !== payload);
    },
  },
});

export const { setMessages, fetchedMessages, removeMessages } = messageSlice.actions;
export default messageSlice.reducer;
