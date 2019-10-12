const {
  getAll,
  getById,
  add,
  deleteById,
  updateById
} = require('../../data/queries/users.query');

const getAllUsers = async () => {
  try {
    return await getAll();
  } catch(error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try{
    return await getById(id);
  } catch(error) {
    throw error;
  }
};

const addUser = async (user) => {
  try{
    return await add(user);
  } catch(error) {
    throw error;
  }
};

const deleteUserById = async(id) =>{
  try{
    return await deleteById(id);
  } catch(error) {
    throw error;
  }
};

const updateUserByID = async(id, user) => {
  try{
    return await updateById(id, user);
  } catch(error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUserById,
  updateUserByID
};
