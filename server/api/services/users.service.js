const { getAll } = require('../../data/queries/users.query');

const getAllUsers = async () =>{
  const users = await getAll();
  return users || Promise.reject();
};

module.exports = {
  getAllUsers
};
