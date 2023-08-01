import { Request, Response } from 'express';
import path from 'path';
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dirs';
import HTTP_STATUS from '~/constants/httpStatuss';
import IMedia from '~/interfaces/media';
import { IResponseResult } from '~/interfaces/response';
import mediaServices from '~/services/media';

const mediaControler = {
  // [POST] /medias/upload-image
  uploadImage: async (req: Request, res: Response<IResponseResult<IMedia[]>>) => {
    const result = await mediaServices.uploadImage(req);

    return res.json({
      message: 'success',
      result
    });
  },

  // [POST] /medias/upload-video
  uploadVideo: async (req: Request, res: Response) => {
    const result = await mediaServices.uploadvideo(req);

    return res.json({
      message: 'success',
      result
    });
  },

  // serve url
  //  [GET] /static/:name
  serveImage: (req: Request, res: Response) => {
    const { name } = req.params;
    return res.status(HTTP_STATUS.OK).sendFile(path.resolve(UPLOAD_IMAGE_DIR, name));
  },

  serveVideo: (req: Request, res: Response) => {
    const { name } = req.params;
    return res.status(HTTP_STATUS.OK).sendFile(path.resolve(UPLOAD_VIDEO_DIR, name));
  }
};

export default mediaControler;
