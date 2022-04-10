import { createSelector } from '@reduxjs/toolkit';

const getState = (state) => state;
export const selectChannelLists = createSelector(getState, ({ channel }) => channel.channels);
export const selectActiveChannelId = createSelector(getState, (state) => state.channel.currentChannelId);

export const selectActiveid = (id) => createSelector(
  getState,
  (state) => state.channel.currentChannelId === id,
);

export const selectActiveChannel = createSelector(
  getState,
  (state) => selectChannelLists(state)
    .find((channel) => channel.id === state.channel.currentChannelId)?.name,
);

export const selectMessages = (id) => createSelector(getState, ({ messages }) => ({
  messages: messages.messages.filter((message) => message.channelId === id),
  messagesCount: messages.messages.filter((message) => message.channelId === id).length,
}));

export const getAppState = createSelector(getState, ({ app }) => app);
