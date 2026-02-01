import io from 'socket.io-client';

let socket;

export const initSocket = () => {
  socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};
