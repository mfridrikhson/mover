const {
  getAll,
  getById,
  getByUserId,
  getByCurrentVehicleId,
  add,
  deleteById,
  updateById
} = require('../../data/queries/drivers.query');
const {
  getById: getVehicleById
} = require('../../data/queries/vehicles.query');
const {
  getById: getVehicleTypeById,
} = require('../../data/queries/vehicleTypes.query');

const getAllDrivers = async () => {
  try {
    return await getAll();
  } catch (err) {
    throw err;
  }
};

const getDriverById = async (id) => {
  try {
    return await getById(id);
  } catch (err) {
    throw err;
  }
};

const getDriverByUserId = async (userId) => {
  try {
    const driver = await getByUserId(userId);
    let currentVehicle, vehicleType;

    if (driver.currentVehicleId) {
      currentVehicle = await getVehicleById(driver.currentVehicleId);
      vehicleType = await getVehicleTypeById(currentVehicle.vehicleTypeId).type;
    }
    return {
      ...driver,
      ...(currentVehicle
        ?
        {
          currentVehicle: {
            ...currentVehicle,
            vehicleType
          }
        }
        : {})
    };
  } catch (err) {
    throw err;
  }
};

const getDriverByCurrentVehicleId = async (currentVehicleId) => {
  try {
    return await getByCurrentVehicleId(currentVehicleId);
  } catch (err) {
    throw err;
  }
};

const addDriver = async (driver) => {
  try {
    return await add(driver);
  } catch (err) {
    throw err;
  }
};

const deleteDriverById = async (id) => {
  try {
    return await deleteById(id);
  } catch (err) {
    throw err;
  }
};

const updateDriverById = async (id, driver) => {
  try {
    return await updateById(id, driver);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllDrivers,
  getDriverById,
  getDriverByUserId,
  getDriverByCurrentVehicleId,
  addDriver,
  deleteDriverById,
  updateDriverById
};
