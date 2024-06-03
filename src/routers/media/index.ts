import { Router } from 'express';
import mediaController from '~/controllers/mediaController';
import wrapRequestHandle from '~/utils/wrapRequest.util';

const mediaRouter = Router();

/**
 * [POST]
 * Path: /upload-image
 * Header: { Authorization: 'Bearer <access_token>' }
 * Body: { File : { key: image } }
 * Response: { message: string, result: IMedia[] }
 */
mediaRouter.post('/upload-image', wrapRequestHandle(mediaController.uploadImage));

/**
 * [POST]
 * Path: /upload-video
 * Header: { Authorization: 'Bearer <access_token>' }
 * Body: { File : { key: video } }
 * Response: { message: string, result: IMedia[] }
 */
mediaRouter.post('/upload-video', wrapRequestHandle(mediaController.uploadVideo));

export default mediaRouter;
