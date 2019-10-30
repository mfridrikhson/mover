import multer from 'multer';
import { fileSizeLimit } from '../../config/imgur.config';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: fileSizeLimit
  }
});

export default upload.single('image');
