const fromJson = ({ fromPoint, toPoint, ...rest }) => ({
  ...rest,
  fromPointAddress: fromPoint.address,
  fromPointLat: fromPoint.coords.lat,
  fromPointLng: fromPoint.coords.lng,
  toPointAddress: toPoint.address,
  toPointLat: toPoint.coords.lat,
  toPointLng: toPoint.coords.lng,
  createdAt: new Date()
});

const toJson = ({
  fromPointAddress,
  fromPointLat,
  fromPointLng,
  toPointAddress,
  toPointLng,
  toPointLat,
  ...rest
}) => ({

  fromPoint: {
    address: fromPointAddress,
    coords: {
      lat: fromPointLat,
      lng: fromPointLng
    }
  },
  toPoint: {
    address: toPointAddress,
    coords: {
      lat: toPointLat,
      lng: toPointLng
    }
  },
  ...rest
});

module.exports = {
  fromJson,
  toJson
};
