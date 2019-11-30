const {
  getAll,
  getById,
  add,
  deleteById,
  updateById
} = require('../../data/queries/vehicleTypes.query');

const getAllVehicleTypes = () => getAll();

const getVehicleTypeById = (id) => getById(id);

const addVehicleType = (vehicleType) => add(vehicleType);

const deleteVehicleTypeById = (id) => deleteById(id);

const updateVehicleTypeById = (id, vehicleType) => updateById(id, vehicleType);

module.exports = {
  getAllVehicleTypes,
  getVehicleTypeById,
  addVehicleType,
  deleteVehicleTypeById,
  updateVehicleTypeById
};
