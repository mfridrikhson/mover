const { getAllOrders } = require( '../api/services/orders.service');

const addRoomManagement = socket => {
  socket.on('createRoom', roomId => {
    socket.join(roomId);
  });
  socket.on('joinRoom', async roomId => {
    if (roomId === 'drivers') {
      const pendingOrders = await getAllOrders({ status: 'Pending' });
      socket.emit('allOrders', { orders: pendingOrders });
    }
    socket.join(roomId);
  });
  socket.on('leaveRoom', roomId => {
    socket.leave(roomId);
  });
};

const addDriverHandlers = socket => {
  socket.on('acceptOrder', ({ orderId, driver }) => {
    socket.to(orderId).emit('orderAccepted', driver);
  });
};

module.exports = socket => {
  addRoomManagement(socket);
  addDriverHandlers(socket);
};
