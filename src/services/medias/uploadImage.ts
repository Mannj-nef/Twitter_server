import { Request } from 'express';
import sharp from 'sharp';
import { UPLOAD_IMAGE_DIR } from '~/constants/dirs';
import { uploadImageFile } from '~/utils/file.util';

const uploadImage = async (req: Request) => {
  const files = await uploadImageFile(req);

  files.forEach(async (file) => {
    const newName = file.newFilename.split('.')[0];
    const newPath = `${UPLOAD_IMAGE_DIR}/${newName}.jpg`;

    const info = sharp(file.filepath).jpeg().toFile(newPath);

    console.log({ info });
  });

  return files;
};

export default uploadImage;
