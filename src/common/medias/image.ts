import { Options } from 'formidable';
import { UPLOAD_IMAGE_TEMP_DIR } from '~/constants/dirs';

const maxFiles = 4;
const maxFileSize = 300 * 1024; // 300kb

export const formidableImageOption: Options = {
  uploadDir: UPLOAD_IMAGE_TEMP_DIR,
  keepExtensions: true,

  maxFiles,
  maxFileSize,
  maxTotalFileSize: maxFileSize * maxFiles,

  filter: ({ mimetype }) => {
    return Boolean(mimetype && mimetype.includes('image'));
  }
};
