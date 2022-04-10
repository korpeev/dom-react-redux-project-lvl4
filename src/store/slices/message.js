import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const sendMessage = createAsyncThunk('message/sendMessage', async ({ messageData, socket, resetForm }) => {
  try {
    await socket.emit('newMessage', {
      data: {
        attributes: {
          messageData,
        },
      },
    });

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
      state.messages.push(payload);
    },
    fetchedMessages: (state, { payload }) => {
      console.log(payload);
      const normalizedData = payload.map((d) => ({
        text: d.data.attributes.messageData.text,
        id: d.id,
        channelId: d.data.attributes.messageData.channelId,
        username: d.data.attributes.messageData.username,
      })) || [];
      state.messages.push(...normalizedData);
    },
    reset: (state) => {
      state.messages = [];
    },
  },
});

export const { setMessages, reset, fetchedMessages } = messageSlice.actions;
export default messageSlice.reducer;
