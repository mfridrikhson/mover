const fromJson = order => {
  const formattedOrder = order;
  const newObj = {
    fromPointAddress: order.fromPoint.address,
    fromPointLat: order.fromPoint.coords.lat,
    fromPointLng: order.fromPoint.coords.lng,
    toPointAddress: order.toPoint.address,
    toPointLat: order.toPoint.coords.lat,
    toPointLng: order.toPoint.coords.lng,
    createdAt: new Date()
  };
  delete formattedOrder.fromPoint;
  delete formattedOrder.toPoint;
  Object.assign(formattedOrder, newObj);
  return formattedOrder;
};

const toJson = order => {
  const formattedOrder = order;
  const newObj = {
    fromPoint: {
      address: order.fromPointAddress,
      coords: {
        lat: order.fromPointLat,
        lng: order.fromPointLng
      }
    },
    toPoint: {
      address: order.toPointAddress,
      coords: {
        lat: order.toPointLat,
        lng: order.toPointLng
      }
    }
  };
  delete formattedOrder.fromPointAddress;
  delete formattedOrder.fromPointLat;
  delete formattedOrder.fromPointLng;
  delete formattedOrder.toPointAddress;
  delete formattedOrder.toPointLat;
  delete formattedOrder.toPointLng;
  Object.assign(formattedOrder, newObj);
  return formattedOrder;
};

module.exports = {
  fromJson,
  toJson
};
