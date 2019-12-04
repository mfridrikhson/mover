const { getAll } = require('../../data/queries/vehicleTypes.query');

const getAllVehicleTypes = () => getAll();

module.exports = { getAllVehicleTypes };
