const {
  getAll,
  getById,
  getByDriverId,
  getByVehicleTypeId,
  add,
  deleteById,
  updateById
} = require('../../data/queries/vehicles.query');

const getAllVehicles = () => getAll();

const getVehicleById = (id) => getById(id);

const getVehiclesByDriverId = (driverId) => getByDriverId(driverId);

const getVehiclesByVehicleTypeId = (vehicleTypeId) => getByVehicleTypeId(vehicleTypeId);

const addVehicle = (vehicle) => add(vehicle);

const deleteVehicleById = (id) => deleteById(id);

const updateVehicleById = (id, vehicle) => updateById(id, vehicle);

module.exports = {
  getAllVehicles,
  getVehicleById,
  getVehiclesByDriverId,
  getVehiclesByVehicleTypeId,
  addVehicle,
  deleteVehicleById,
  updateVehicleById
};
