import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import storage from '../utils/storage.js';
import { setChannels, setCurrentChannelId } from '../store/slices/channel.js';
import ChannelPanel from '../components/ChannelPanel/ChannelPanel.jsx';
import { fetchedMessages } from '../store/slices/message.js';
import MessageContainer from '../components/MessageContainer/index.jsx';
import { setUserName } from '../store/slices/app.js';

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    const username = storage.get('username');
    dispatch(setUserName(username));
    axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${storage.get('token')}`,
      },
    }).then(({ data }) => {
      dispatch(setChannels(data.channels));
      dispatch(setCurrentChannelId(data.currentChannelId));
      dispatch(fetchedMessages(data.messages));
    });
  }, []);
  console.log('home');
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
