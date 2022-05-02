import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import storage from 'utils/storage';
import { setChannels, setCurrentChannelId } from 'store/slices/channel';
import ChannelPanel from 'components/ChannelPanel/ChannelPanel';
import { fetchedMessages } from 'store/slices/message';
import MessageContainer from 'components/MessageContainer/index';
import { setUserName } from 'store/slices/app';
import { toastify } from 'services/toastify';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();
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
    }).catch(() => toastify(t('errors.anyError'), 'error'));
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
