import { Request, Response } from 'express';
import { IResponse } from '~/interfaces/response';
import mediaServices from '~/services/media';

const mediaControler = {
  // [POST] /medias/upload-image
  uploadImage: (rep: Request, res: Response<IResponse>) => {
    const service = mediaServices.uploadImage();
    return res.json({
      message: 'success'
    });
  }
};

export default mediaControler;
