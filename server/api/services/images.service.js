const axios = require('axios');
const { imgurId } = require('../../config/imgur.config');
const { getById, add } = require('../../data/queries/images.query');

const getImageById = id => getById(id);

const uploadToImgur = async (file) => {
  try {
    const { data: { data } } = await axios.post(
      'https://api.imgur.com/3/upload',
      {
        image: file.buffer.toString('base64')
      }, {
        headers: { Authorization: `Client-ID ${imgurId}` }
      }
    );
    return {
      link: data.link,
      deleteHash: data.deletehash
    };
  } catch ({ response: { data: { status, data } } }) { // parse Imgur error
    return Promise.reject({ status, message: data.error });
  }
};

const upload = async (file) => {
  const image = await uploadToImgur(file);
  return add(image);
};

module.exports = {
  getImageById,
  upload
};
