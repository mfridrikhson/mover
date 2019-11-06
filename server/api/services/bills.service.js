const {
  getAll,
  getById,
  add,
  deleteById,
  updateById
} = require('../../data/queries/bills.query');

const getAllBills = async () => {
  try {
    return await getAll();
  } catch (err) {
    throw err;
  }
};

const getBillById = async (id) => {
  try {
    return await getById(id);
  } catch (err) {
    throw err;
  }
};

const addBill = async (bill) => {
  try {
    return await add(bill);
  } catch (err) {
    throw err;
  }
};

const deleteBillById = async (id) => {
  try {
    return await deleteById(id);
  } catch (err) {
    throw err;
  }
};

const updateBillById = async (id, bill) => {
  try {
    return await updateById(id, bill);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllBills,
  getBillById,
  addBill,
  deleteBillById,
  updateBillById
};
