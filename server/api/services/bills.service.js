const {
  getAll,
  getById,
  add,
  deleteById,
  updateById
} = require('../../data/queries/bills.query');

const getAllBills = () => getAll();

const getBillById = (id) => getById(id);

const addBill = (bill) => add(bill);

const deleteBillById = (id) => deleteById(id);

const updateBillById = (id, bill) => updateById(id, bill);

module.exports = {
  getAllBills,
  getBillById,
  addBill,
  deleteBillById,
  updateBillById
};
