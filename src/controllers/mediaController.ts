import { Request, Response } from 'express';
import mediaServices from '~/services/media';
import { uploadImageFile } from '~/utils/file.util';

const mediaControler = {
  // [POST] /medias/upload-image
  uploadImage: async (req: Request, res: Response) => {
    const result = await mediaServices.uploadImage(req);

    return res.json({
      message: 'success',
      result
    });
  }
};

export default mediaControler;
