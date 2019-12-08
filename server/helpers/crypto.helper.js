const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  encrypt: (data) => bcrypt.hash(data, saltRounds),
  compare: (data, encrypted) => bcrypt.compare(data, encrypted)
};
