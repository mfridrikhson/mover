const { getById } = require('../../data/queries/users.query');
const { addUser } = require('../services/users.service');
const { getDriverByUserId } = require('../services/drivers.service');
const tokenHelper = require('../../helpers/token.helper');

const login = async ({ id, email }) => {
  const user = await getById(id);
  if (user.isDriver) {
    return {
      user,
      driver: await getDriverByUserId(id),
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
  if (newUser.user) {
    return login(newUser.user);
  }
  return login(newUser);
};

module.exports = {
  login,
  register
};

