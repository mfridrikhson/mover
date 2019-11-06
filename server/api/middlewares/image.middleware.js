const multer = require('@koa/multer');
const { fileSizeLimit } = require('../../config/imgur.config');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: fileSizeLimit
  }
});

module.exports = upload.single('image');
