import { Request } from 'express';
import fileSystem from 'fs';
import sharp from 'sharp';
import { isProduction } from '~/configs/argv';
import { UPLOAD_IMAGE_DIR } from '~/constants/dirs';
import { uploadImageFile } from '~/utils/file.util';

import dotenv from 'dotenv';

dotenv.config();

const uploadImage = async (req: Request) => {
  const files = await uploadImageFile(req);

  let name;

  files.forEach(async (file) => {
    const newName = file.newFilename.split('.')[0];
    const newPath = `${UPLOAD_IMAGE_DIR}/${newName}.jpg`;

    name = newName;

    await sharp(file.filepath).jpeg().toFile(newPath);
    fileSystem.unlinkSync(file.filepath);
  });

  const imageURl = isProduction ? process.env.HOST : `http://localhot:${process.env.PORT}`;

  return `${imageURl}/medias/${name}.jpg`;
};

export default uploadImage;
