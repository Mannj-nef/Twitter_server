import { Router } from 'express';
import userRouter from './user/userRouter';
import tweetRouter from './tweet/tweetRouter';
import notFound from '~/controllers/notFoundController';
import mediaRouter from './media/mediaRouter';
import staticRouter from './static/staticRouter';
import followRouter from './follow/followRouter';

const router = Router();

router.use('/users', userRouter);
router.use('/follow', followRouter);
router.use('/medias', mediaRouter);
router.use('/tweets', tweetRouter);
router.use('/static', staticRouter);

// router not found!
router.use('*', notFound);

export default router;
