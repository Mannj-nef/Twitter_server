import { Request, Response } from 'express';
import path from 'path';
import { UPLOAD_IMAGE_DIR } from '~/constants/dirs';
import HTTP_STATUS from '~/constants/httpStatuss';
import mediaServices from '~/services/media';

const mediaControler = {
  // [POST] /medias/upload-image
  uploadImage: async (req: Request, res: Response) => {
    const result = await mediaServices.uploadImage(req);

    return res.json({
      message: 'success',
      result
    });
  },

  // serve url
  serveImage: (req: Request, res: Response) => {
    const { name } = req.params;
    return res.status(HTTP_STATUS.OK).sendFile(path.resolve(UPLOAD_IMAGE_DIR, name));
  }
};

export default mediaControler;
