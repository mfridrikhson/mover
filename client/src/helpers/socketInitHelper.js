import io from 'socket.io-client';

export const socketInit = namespace => io(`${process.env.REACT_APP_SERVER_URL}/${namespace}`);
