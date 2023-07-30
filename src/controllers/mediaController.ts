import { Request, Response } from 'express';
import { uploadImageFile } from '~/utils/file.util';

const mediaControler = {
  // [POST] /medias/upload-image
  uploadImage: async (req: Request, res: Response) => {
    // const service = mediaServices.uploadImage();

    const data = await uploadImageFile(req);

    return res.json({
      message: 'success',
      data
    });
  }
};

export default mediaControler;
