const { getById } = require('../../data/queries/users.query');
const { addUser } = require('../services/users.service');
const tokenHelper = require('../../helpers/token.helper');

const login = async ({ id, email }) => ({
  user: await getById(id),
  token: await tokenHelper.createToken({ id, email })
});

const register = async (user) => {
  const newUser = await addUser(user);
  if( newUser.user ) {
    return login(newUser.user);
  }
  return login(newUser);
};

module.exports = {
  login,
  register
};

