import { Router } from 'express';
import userRouter from './user/userRouter';
import tweetRouter from './tweet/tweetRouter';
import notFound from '~/controllers/notFoundController';
import mediaRouter from './media/mediaRouter';

const router = Router();

router.use('/users', userRouter);
router.use('/medias', mediaRouter);
router.use('/tweets', tweetRouter);

// router not found!
router.use('*', notFound);

export default router;
