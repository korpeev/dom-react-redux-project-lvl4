import React, {
  createContext, useContext, useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { removeMessages, setMessages } from 'store/slices/message';
import {
  removeChannel, renameChannel, setChannels, setCurrentChannelId,
} from 'store/slices/channel';
import { toastify } from 'services/toastify';
import { useTranslation } from 'react-i18next';

const SocketContext = createContext({
  createEmit: null,
});

export default function SocketProvider({ children, socket }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const createEmit = async (event, data) => {
    try {
      await socket.emit(event, data);
    } catch (e) {
      toastify(t('errors.networkError'));
    }
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket.io connected');
    });
    socket.on('newMessage', (response) => {
      dispatch(setMessages(response));
    });

    socket.on('newChannel', (response) => {
      dispatch(setChannels([response]));
      dispatch(setCurrentChannelId(response.id));
    });

    socket.on('removeChannel', (response) => {
      const { id } = response;
      dispatch(removeChannel(id));
      dispatch(removeMessages(id));
    });

    socket.on('renameChannel', (response) => {
      dispatch(renameChannel(response));
    });

    socket.on('connect_failed', () => {
      toastify(t('errors.networkError'), 'error');
    });

    socket.on('connect_error', () => {
      setTimeout(() => {
        toastify(t('errors.socketReconnect'), 'warning');
        socket.connect();
      }, 5000);
    });
  }, [socket]);

  return (
    <SocketContext.Provider value={{ createEmit }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const { createEmit } = useContext(SocketContext);
  return createEmit;
}
