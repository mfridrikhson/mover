const {
  getById,
  add,
  updateById
} = require('../../data/queries/users.query');

const { getDriverByUserId, addDriver } = require('../services/drivers.service');

const getUserById = async (id) => {
  const user = await getById(id);
  if (user.isDriver) {
    const driver = await getDriverByUserId(user.id);
    return { user, driver };
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
