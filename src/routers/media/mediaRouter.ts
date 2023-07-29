import { Router } from 'express';
import mediaControler from '~/controllers/mediaController';

const mediaRouter = Router();

/**
 * [POST]
 * Path: /upload-image
 */
mediaRouter.post('/upload-image', mediaControler.uploadImage);

export default mediaRouter;
