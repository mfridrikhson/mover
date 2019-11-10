const {
  getAll,
  getById,
  add,
  deleteById,
  updateById
} = require('../../data/queries/users.query');

const { addDriver } = require('../services/drivers.service');

const getAllUsers = async () => {
  try {
    return await getAll();
  } catch (err) {
    throw err;
  }
};

const getUserById = async (id) => {
  try {
    return await getById(id);
  } catch (err) {
    throw err;
  }
};

const addUser = async (user) => {
  try {
    const [createdUser] = await add(user);
    if (createdUser.isDriver) {
      const [createdDriver] = await addDriver({ userId: createdUser.id });
      return { user: createdUser, driver: createdDriver };
    }
    return createdUser;
  } catch (err) {
    throw err;
  }
};

const deleteUserById = async (id) => {
  try {
    return await deleteById(id);
  } catch (err) {
    throw err;
  }
};

const updateUserByID = async (id, user) => {
  try {
    return await updateById(id, user);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUserById,
  updateUserByID
};
