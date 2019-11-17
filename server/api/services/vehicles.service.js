const {
  getAll,
  getById,
  getByDriverId,
  getByVehicleTypeId,
  add,
  deleteById,
  updateById
} = require('../../data/queries/vehicles.query');

const getAllVehicles = async () => {
  try {
    return await getAll();
  } catch (err) {
    throw err;
  }
};

const getVehicleById = async (id) => {
  try {
    return await getById(id);
  } catch (err) {
    throw err;
  }
};

const getVehiclesByDriverId = async (driverId) => {
  try {
    return await getByDriverId(driverId);
  } catch (err) {
    throw err;
  }
};

const getVehiclesByVehicleTypeId = async (vehicleTypeId) => {
  try {
    return await getByVehicleTypeId(vehicleTypeId);
  } catch (err) {
    throw err;
  }
};

const addVehicle = async (vehicle) => {
  try {
    return await add(vehicle);
  } catch (err) {
    throw err;
  }
};

const deleteVehicleById = async (id) => {
  try {
    return await deleteById(id);
  } catch (err) {
    throw err;
  }
};

const updateVehicleById = async (id, vehicle) => {
  try {
    return await updateById(id, vehicle);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllVehicles,
  getVehicleById,
  getVehiclesByDriverId,
  getVehiclesByVehicleTypeId,
  addVehicle,
  deleteVehicleById,
  updateVehicleById
};
