import { Router } from 'express';

import userRouter from './user';
import tweetRouter from './tweet';
import mediaRouter from './media';
import staticRouter from './static';
import followRouter from './follow';
import bookmarkRouter from './bookmars';

import notFound from '~/controllers/notFoundController';

const router = Router();

router.use('/users', userRouter);
router.use('/follow', followRouter);
router.use('/medias', mediaRouter);
router.use('/tweets', tweetRouter);
router.use('/static', staticRouter);
router.use('/bookmarks', bookmarkRouter);

// router not found!
router.use('*', notFound);

export default router;
