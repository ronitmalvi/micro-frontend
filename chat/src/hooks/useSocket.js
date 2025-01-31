import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

export const useSocket = (url) => {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(url);
    
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [url]);

  return socketRef.current;
};