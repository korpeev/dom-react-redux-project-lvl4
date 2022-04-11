import React from 'react';
import { useSelector } from 'react-redux';
import MessageForm from './MessageForm.jsx';

import { selectActiveChannel, selectActiveChannelId, selectMessages } from '../../selectors/index.js';
import MessageItem from './MessageItem.jsx';

export default function () {
  const channelTitle = useSelector(selectActiveChannel);
  const activeChannelId = useSelector(selectActiveChannelId);
  const username = useSelector((state) => state.app.username);
  const { messagesList, messagesCount } = useSelector(selectMessages(activeChannelId));
  return (
    <div className="col p-2 h-100">
      <div className="d-flex flex-column h-100">
        {' '}
        <div className="p-4">
          <span className="fw-bold">
            #
            {channelTitle}
          </span>
          <span className="d-block ">
            {messagesCount}
            {' '}
            сообщений
          </span>
          <hr />

        </div>
        <div className="overflow-auto flex-fill">
          {messagesList.map((msg) => (
            <MessageItem key={msg.id} username={msg.username} text={msg.text} />
          ))}
        </div>
        <MessageForm channelId={activeChannelId} username={username} />
      </div>

    </div>
  );
}
