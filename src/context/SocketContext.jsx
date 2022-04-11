import React, {
  createContext, useContext, useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { removeMessages, setMessages } from '../store/slices/message.js';
import { removeChannel, renameChannel, setChannels } from '../store/slices/channel.js';

const SocketContext = createContext({
  createEmit: null,
});

export default function SocketProvider({ children, socket }) {
  const dispatch = useDispatch();
  const createEmit = async (event, data) => {
    try {
      await socket.emit(event, data);
    } catch (e) {
      console.log(e);
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
    });

    socket.on('removeChannel', (response) => {
      const { id } = response;
      dispatch(removeChannel(id));
      dispatch(removeMessages(id));
    });

    socket.on('renameChannel', (response) => {
      dispatch(renameChannel(response));
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
