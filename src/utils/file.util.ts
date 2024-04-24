import { Request } from 'express';
import formidable, { Fields, File, Files, Options } from 'formidable';
import { CustomError } from '~/models/errors';

import fileSystem from 'fs';

import { MEDIA_MESSAGE } from '~/constants/messages';
import HTTP_STATUS from '~/constants/httpStatus';

export const handleCreateFolder = (path: string) => {
  if (!fileSystem.existsSync(path)) {
    fileSystem.mkdirSync(path, {
      recursive: true
    });
  }
};

export const uploadFile = async ({
  req,
  formidableOption
}: {
  req: Request;
  formidableOption: Options;
}) => {
  const form = formidable(formidableOption);

  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err: { httpCode: number }, fields: Fields, files: Files) => {
      const urlReq = req.url;

      if (err) {
        return reject(
          new CustomError({
            statusCode: err.httpCode,
            message: `${MEDIA_MESSAGE.REQUEST_ENTITY_TOO_LARGE}: ${formidableOption.maxFileSize
              ?.toString()
              .slice(0, 2)}${
              urlReq.includes('image') ? 'kB' : urlReq.includes('video') ? 'MB' : ''
            }`
          })
        );
      }

      if (!files.image && !files.video) {
        return reject(
          new CustomError({
            message: MEDIA_MESSAGE.FILE_NOT_IS_EMPTY,
            statusCode: HTTP_STATUS.NOT_FOUND
          })
        );
      }

      resolve((files.image as File[]) || (files.video as File[]));
    });
  });
};
