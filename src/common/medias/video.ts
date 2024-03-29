import { Options } from 'formidable';
import { UPLOAD_VIDEO_DIR } from '~/constants/dirs';
import { MediaType } from '~/enums/media';

const maxFiles = 1;
const maxFileSize = 200 * 1024 * 1024; // 200MB

export const formidableVideoOption: Options = {
  uploadDir: UPLOAD_VIDEO_DIR,

  maxFiles,
  maxFileSize,
  maxTotalFileSize: maxFileSize * maxFiles,

  filter: ({ mimetype }) => {
    return Boolean(mimetype && mimetype.includes(MediaType.Video));
  }
};
