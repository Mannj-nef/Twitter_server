import tweetController from '~/controllers/tweetController';
import { Router } from 'express';

const tweetRouter = Router();

// [GET]
tweetRouter.get('/', tweetController.getAll);

// [POST]
tweetRouter.post('/', tweetController.createTweer);

export default tweetRouter;
