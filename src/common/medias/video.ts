import { Options } from 'formidable';

export const formidableVideoOption: Options = {
  uploadDir: 'video/demo',
  maxFiles: 1,
  keepExtensions: true,
  maxFileSize: 50 * 1024 * 1024 // 50MB
};
