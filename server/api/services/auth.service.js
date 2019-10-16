const { getById, add } = require('../../data/queries/users.query');
const tokenHelper = require('../../helpers/token.helper');

const login = async ({ id, email }) => ({
  user: await getById(id),
  token: await tokenHelper.createToken({ id, email })
});

const register = async (user) => {
  const [newUser] = await add(user);
  return login(newUser);
};

module.exports = {
  login,
  register
};

