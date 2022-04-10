import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageForm from './MessageForm.jsx';
import { reset } from '../../store/slices/message.js';
import { selectActiveChannel, selectActiveChannelId, selectMessages } from '../../selectors/index.js';
import MessageItem from './MessageItem.jsx';

export default function () {
  const channelTitle = useSelector(selectActiveChannel);
  const activeChannelId = useSelector(selectActiveChannelId);
  const username = useSelector((state) => state.app.username);
  const { messages, messagesCount } = useSelector(selectMessages(activeChannelId));
  const dispatch = useDispatch();
  useEffect(() => () => {
    dispatch(reset());
  }, []);
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
          {messages.map((msg) => (
            <MessageItem key={msg.id} username={msg.username} text={msg.text} />
          ))}
        </div>
        <MessageForm channelId={activeChannelId} username={username} />
      </div>

    </div>
  );
}
