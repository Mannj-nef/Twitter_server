import { Router } from 'express';
import mediaControler from '~/controllers/mediaController';
import wrapRequestHandle from '~/utils/wrapRequest.util';

const mediaRouter = Router();

/**
 * [POST]
 * Path: /upload-image
 * Header: { Authorization: 'Bearer <access_token>' }
 * Body: { File : { key: image } }
 * Response: { message: string, result: url[] }
 */
mediaRouter.post('/upload-image', wrapRequestHandle(mediaControler.uploadImage));

/**
 * [POST]
 * Path: /upload-video
 * Header: { Authorization: 'Bearer <access_token>' }
 * Body: { File : { key: video } }
 * Response: { message: string, result: url[] }
 */
mediaRouter.post('/upload-video', wrapRequestHandle(mediaControler.uploadVideo));

export default mediaRouter;
