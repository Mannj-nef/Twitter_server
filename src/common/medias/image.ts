import { Options } from 'formidable';
import { UPLOAD_IMAGE_TEMP_DIR } from '~/constants/dirs';

export const formidableImageOption: Options = {
  uploadDir: UPLOAD_IMAGE_TEMP_DIR,
  maxFiles: 4,
  keepExtensions: true,
  maxFileSize: 300 * 1024, // 300kb
  filter: ({ mimetype }) => {
    return Boolean(mimetype && mimetype.includes('image'));
  }
};
