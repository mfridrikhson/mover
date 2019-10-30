import axios from 'axios';
import { imgurId } from '../../config/imgur.config';
import { getById } from '../../data/queries/images.query';

export const getImageById = id => getById(id);

export const upload = async file => {
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
