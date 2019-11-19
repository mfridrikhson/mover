import io from 'socket.io-client';

export const socketInit = isDriver => {
  const socket = io(process.env.REACT_APP_SERVER_URL);
  if (isDriver) {
    socket.emit('joinRoom', 'drivers');
  }

  return socket;
};
