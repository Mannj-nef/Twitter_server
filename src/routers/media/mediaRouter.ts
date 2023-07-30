import { Router } from 'express';
import mediaControler from '~/controllers/mediaController';
import wrapRequestHandle from '~/utils/wrapRequest.util';

const mediaRouter = Router();

/**
 * [POST]
 * Path: /upload-image
 */
mediaRouter.post('/upload-image', wrapRequestHandle(mediaControler.uploadImage));

export default mediaRouter;
