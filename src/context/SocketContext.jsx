import React, { createContext, useContext, useMemo } from 'react';

const SocketContext = createContext({
  socket: null,
});
export default function SocketProvider({ children, socket }) {
  const socketApi = useMemo(() => socket, [socket]);
  return (
    <SocketContext.Provider value={{ socket: socketApi }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const { socket } = useContext(SocketContext);
  return { socket };
}
