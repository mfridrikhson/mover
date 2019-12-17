const {
  getByDriverId,
  add
} = require('../../data/queries/vehicles.query');
const {
  getById: getVehicleTypeById,
} = require('../../data/queries/vehicleTypes.query');

const getVehiclesByDriverId = (driverId) => getByDriverId(driverId);

const addVehicle = async (vehicle) => {
  const [addedVehicle] = await add(vehicle);
  const { type: vehicleType } = await getVehicleTypeById(addedVehicle.vehicleTypeId);

  return {
    ...addedVehicle,
    vehicleType
  };
};

module.exports = {
  getVehiclesByDriverId,
  addVehicle
};
