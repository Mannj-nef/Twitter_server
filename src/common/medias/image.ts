import { Options } from 'formidable';
import { UPLOAD_IMAGE_DIR } from '~/constants/dirs';
import { MediaType } from '~/enums/media';

const maxFiles = 4;
const maxFileSize = 300 * 1024; // 300kb

export const formidableImageOption: Options = {
  uploadDir: UPLOAD_IMAGE_DIR,

  maxFiles,
  maxFileSize,
  maxTotalFileSize: maxFileSize * maxFiles,

  filter: ({ mimetype }) => {
    return Boolean(mimetype && mimetype.includes(MediaType.Image));
  }
};
