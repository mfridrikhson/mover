const dotenv = require('dotenv');

dotenv.config();

const imgurId = process.env.IMGUR_ID;
const imgurSecret = process.env.IMGUR_SECRET;
const fileSizeLimit = 10000000; // ~ 10MB

module.exports = {
  imgurId,
  imgurSecret,
  fileSizeLimit
};
