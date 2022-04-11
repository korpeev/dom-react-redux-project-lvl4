import { createSelector } from '@reduxjs/toolkit';

const getState = (state) => state;
export const getChannelState = createSelector(getState, ({ channel }) => channel);
export const selectActiveChannelId = createSelector(
  getState,
  (state) => state.channel.currentChannelId,
);

export const selectActiveid = (id) => createSelector(
  getState,
  (state) => state.channel.currentChannelId === id,
);

export const selectActiveChannel = createSelector(
  getState,
  (state) => getChannelState(state).channels
    .find((channel) => channel.id === state.channel.currentChannelId)?.name,
);

export const selectMessages = (id) => createSelector(getState, ({ messages: messageStore }) => ({
  messagesList: messageStore.messages.filter((message) => message.channelId === id),
  messagesCount: messageStore.messages.filter((message) => message.channelId === id).length,
}));

export const getAppState = createSelector(getState, ({ app }) => app);
