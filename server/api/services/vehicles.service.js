const {
  getByDriverId,
  add
} = require('../../data/queries/vehicles.query');

const getVehiclesByDriverId = (driverId) => getByDriverId(driverId);

const addVehicle = (vehicle) => add(vehicle);

module.exports = {
  getVehiclesByDriverId,
  addVehicle
};
