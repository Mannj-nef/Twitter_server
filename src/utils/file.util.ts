import { Request } from 'express';
import formidable, { Fields, Files } from 'formidable';
import { CustomError, EntityError } from '~/models/errors';

import fileSystem from 'fs';

import path from 'path';
import { MEDIA_MESSAGE } from '~/constants/messages';
import HTTP_STATUS from '~/constants/httpStatuss';

const formidableOption: formidable.Options = {
  uploadDir: path.resolve('uploads'),
  maxFiles: 4,
  keepExtensions: true,
  maxFileSize: 300 * 1024, // 300mb
  filter: ({ mimetype }) => {
    return Boolean(mimetype && mimetype.includes('image'));
  }
};

export const uploadImageFile = async (req: Request) => {
  const form = formidable(formidableOption);

  return new Promise((resolve, reject) => {
    form.parse(req, (err: { httpCode: number }, fields: Fields, files: Files) => {
      if (err) {
        return reject(
          new CustomError({
            statusCode: err.httpCode,
            message: `${MEDIA_MESSAGE.REQUEST_ENTITY_TOO_LARGE}: ${formidableOption.maxFileSize
              ?.toString()
              .slice(0, 2)}MB`
          })
        );
      }

      if (!files.image) {
        return reject(
          new CustomError({
            message: MEDIA_MESSAGE.FILE_TYPE_IS_NOT_VALID,
            statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY
          })
        );
      }

      resolve({ fields, files });
    });
  });
};

export const handleCreateFolder = (foulderName: string) => {
  const foulder = path.resolve(foulderName);

  if (!fileSystem.existsSync(foulder)) {
    fileSystem.mkdirSync(foulder),
      {
        recursive: true
      };
  }
};
