const { getById } = require('../../data/queries/users.query');
const { getById: getVehicleTypeById } = require('../../data/queries/vehicleTypes.query');
const { addUser } = require('../services/users.service');
const { getDriverByUserId } = require('../services/drivers.service');
const { getVehiclesByDriverId } = require('../services/vehicles.service');
const tokenHelper = require('../../helpers/token.helper');

const login = async ({ id, email }) => {
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
      },
      token: await tokenHelper.createToken({ id, email })
    };
  }
  return {
    user,
    token: await tokenHelper.createToken({ id, email })
  };
};

const register = async (user) => {
  const newUser = await addUser(user);
  return login(newUser.user);
};

module.exports = {
  login,
  register
};
