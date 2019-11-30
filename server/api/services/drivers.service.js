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

const getAllDrivers = () => getAll();

const getDriverById = (id) => getById(id);

const getDriverByUserId = async (userId) => {
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
};

const getDriverByCurrentVehicleId = (currentVehicleId) => getByCurrentVehicleId(currentVehicleId);

const addDriver = (driver) => add(driver);

const deleteDriverById = (id) => deleteById(id);

const updateDriverById = (id, driver) => updateById(id, driver);

module.exports = {
  getAllDrivers,
  getDriverById,
  getDriverByUserId,
  getDriverByCurrentVehicleId,
  addDriver,
  deleteDriverById,
  updateDriverById
};
