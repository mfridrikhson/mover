const {
  getAll,
  getById,
  add,
  deleteById,
  updateById
} = require('../../data/queries/vehicleTypes.query');

const getAllVehicleTypes = async () => {
  try {
    return await getAll();
  } catch (err) {
    throw err;
  }
};

const getVehicleTypeById = async (id) => {
  try {
    return await getById(id);
  } catch (err) {
    throw err;
  }
};

const addVehicleType = async (vehicleType) => {
  try {
    return await add(vehicleType);
  } catch (err) {
    throw err;
  }
};

const deleteVehicleTypeById = async (id) => {
  try {
    return await deleteById(id);
  } catch (err) {
    throw err;
  }
};

const updateVehicleTypeById = async (id, vehicleType) => {
  try {
    return await updateById(id, vehicleType);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllVehicleTypes,
  getVehicleTypeById,
  addVehicleType,
  deleteVehicleTypeById,
  updateVehicleTypeById
};
