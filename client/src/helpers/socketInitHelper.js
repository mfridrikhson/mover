import io from 'socket.io-client';

export const socketInit = () => io(process.env.REACT_APP_SERVER_URL);
