const {
  getById,
  add,
  updateById
} = require('../../data/queries/users.query');
const { getById: getVehicleTypeById } = require('../../data/queries/vehicleTypes.query');

const { getDriverByUserId, addDriver } = require('../services/drivers.service');
const { getVehiclesByDriverId } = require('../services/vehicles.service');

const getUserById = async (id) => {
  const user = await getById(id);
  if (user.isDriver) {
    const driver = await getDriverByUserId(user.id);
    const vehicles = await getVehiclesByDriverId(driver.id);
    const vehicleTypes = await Promise.all(vehicles.map(({ vehicleTypeId }) => getVehicleTypeById(vehicleTypeId)));
    return {
      user,
      driver: {
        ...driver,
        vehicles: vehicles.map((vehicle) => ({
          ...vehicle,
          vehicleType: vehicleTypes.find(({ id }) => id === vehicle.vehicleTypeId).type
        }))
      }
    };
  }
  return { user };
};

const addUser = async (user) => {
  const [createdUser] = await add(user);
  if (createdUser.isDriver) {
    const [createdDriver] = await addDriver({ userId: createdUser.id });
    return { user: createdUser, driver: createdDriver };
  }
  return { user: createdUser };
};

const updateUserById = (id, user) => updateById(id, user);

module.exports = {
  getUserById,
  addUser,
  updateUserById
};
