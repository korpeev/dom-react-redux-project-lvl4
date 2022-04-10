import { configureStore } from '@reduxjs/toolkit';
import channel from './slices/channel.js';
import messages from './slices/message.js';
import app from './slices/app.js';

export const store = configureStore({
  reducer: {
    channel,
    messages,
    app,
  },
});
