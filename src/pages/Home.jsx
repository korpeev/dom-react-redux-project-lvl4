import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import storage from '../utils/storage.js';
import { reset, setChannels, setCurrentChannelId } from '../store/slices/channel.js';
import ChannelPanel from '../components/ChannelPanel/ChannelPanel.jsx';
import { fetchedMessages } from '../store/slices/message.js';
import MessageContainer from '../components/MessageContainer/index.jsx';

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${storage.get('token')}`,
      },
    }).then(({ data }) => {
      dispatch(setChannels(data.channels));
      dispatch(fetchedMessages(data.messages));
      dispatch(setCurrentChannelId(data.currentChannelId));
    });

    return () => {
      dispatch(reset());
    };
  }, []);
  return (
    <div className="container h-75 rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelPanel />
        <MessageContainer />
      </div>

    </div>
  );
}

export default Home;
