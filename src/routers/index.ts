import { Router } from 'express';
import userRouter from './user/userRouter';
import tweetRouter from './tweet/tweetRouter';
import notFound from '~/controllers/notFoundController';

const router = Router();

router.use('/users', userRouter);
router.use('/tweets', tweetRouter);

// router not found!
router.use('*', notFound);

export default router;
