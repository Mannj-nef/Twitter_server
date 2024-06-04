import { Request } from 'express';
import fileSystem from 'fs';
import sharp from 'sharp';
import { UPLOAD_IMAGE_DIR } from '~/constants/dirs';
import { uploadFile } from '~/utils/file.util';

import dotenv from 'dotenv';
import { MediaType } from '~/enums/media';
import { IMedia } from '~/models/schemas/Media';
import { formidableImageOption } from '~/common/medias';
import { uploadS3 } from '~/utils/s3';
import fs from 'fs';

dotenv.config();

const uploadImage = async (req: Request) => {
  const files = await uploadFile({ req, formidableOption: formidableImageOption });

  const listUrlImage: IMedia[] = await Promise.all(
    files.map(async (file) => {
      const newName = file.originalFilename?.split('.')[0];
      const newPath = `${UPLOAD_IMAGE_DIR}/${newName}.jpg`;

      await sharp(file.filepath).jpeg().toFile(newPath);

      const imageURl = await uploadS3({
        fileName: `images/${newName}.jpeg`,
        file: fs.readFileSync(newPath)
      });

      await Promise.all([fileSystem.unlinkSync(file.filepath), fileSystem.unlinkSync(newPath)]);

      return { url: imageURl, type: MediaType.Image };
    })
  );

  return listUrlImage;
};

export default uploadImage;
