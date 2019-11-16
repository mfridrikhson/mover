const { getAllOrders } = require( '../api/services/orders.service');

const defaultHandlers = socket => {
  socket.on('createRoom', (roomId) => {
    socket.join(roomId);
  });
  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
  });
};

const driverHandlers = async (socket) => {
  const pendingOrders = await getAllOrders({ status: 'Pending' });
  socket.emit('allOrders', { orders: pendingOrders });

  return defaultHandlers(socket);
};

module.exports = {
  defaultHandlers,
  driverHandlers
};
