const { getAllOrders, updateOrderById } = require( '../api/services/orders.service');
const { addOrderRoute } = require('../api/services/orderRoutes.service');

const addRoomManagement = socket => {
  socket.on('createRoom', roomId => {
    socket.join(roomId);
    if (roomId !== 'drivers') {
      socket.on('disconnect', async () => {
        await updateOrderById(roomId, { status: 'Cancelled' });
      });
    }
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
  socket.on('acceptOrder', async ({ orderId, driver }) => {
    socket.to(orderId).emit('orderAccepted', driver);
    await updateOrderById(orderId, { status: 'Accepted' });
  });
};

const addPositionHandlers = socket => {
  socket.on('newRoutePoint', async ({ orderId, lat, lng }) => {
    socket.to(orderId).emit('newRoutePoint', { lat, lng });
    await addOrderRoute({ orderId, lat, lng });
  });
};

module.exports = socket => {
  addRoomManagement(socket);
  addDriverHandlers(socket);
  addPositionHandlers(socket);
};
