import { Request } from 'express';
import formidable, { Fields, File, Files } from 'formidable';
import { CustomError } from '~/models/errors';

import fileSystem from 'fs';

import { MEDIA_MESSAGE } from '~/constants/messages';
import HTTP_STATUS from '~/constants/httpStatuss';
import { formidableImageOption } from '~/common/medias';

export const handleCreateFolder = (path: string) => {
  if (!fileSystem.existsSync(path)) {
    fileSystem.mkdirSync(path, {
      recursive: true
    });
  }
};

export const uploadImageFile = async (req: Request) => {
  const form = formidable(formidableImageOption);

  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err: { httpCode: number }, fields: Fields, files: Files) => {
      if (err) {
        return reject(
          new CustomError({
            statusCode: err.httpCode,
            message: `${MEDIA_MESSAGE.REQUEST_ENTITY_TOO_LARGE}: ${formidableImageOption.maxFileSize
              ?.toString()
              .slice(0, 2)}kB`
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

      resolve(files.image as File[]);
    });
  });
};
