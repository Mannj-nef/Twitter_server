import { Request } from 'express';
import fileSystem from 'fs';
import sharp from 'sharp';
import { isProduction } from '~/configs/argv';
import { UPLOAD_IMAGE_DIR } from '~/constants/dirs';
import { uploadFile } from '~/utils/file.util';

import dotenv from 'dotenv';
import { MediaType } from '~/enums/media';
import IMedia from '~/interfaces/media';
import { formidableImageOption } from '~/common/medias';
dotenv.config();

const uploadImage = async (req: Request) => {
  const files = await uploadFile({ req, formidableOption: formidableImageOption });

  const listUrlImage: IMedia[] = await Promise.all(
    files.map(async (file) => {
      const newName = file.newFilename.split('.')[0];
      const newPath = `${UPLOAD_IMAGE_DIR}/${newName}.jpg`;

      await sharp(file.filepath).jpeg().toFile(newPath);
      fileSystem.unlinkSync(file.filepath);

      const hostImgUrl = isProduction ? process.env.HOST : `http://localhost:${process.env.PORT}`;
      const imageURl = `${hostImgUrl}/static/images/${newName}.jpg`;

      return { url: imageURl, type: MediaType.Image };
    })
  );

  return listUrlImage;
};

export default uploadImage;
