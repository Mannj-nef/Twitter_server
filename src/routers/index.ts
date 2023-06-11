import { Router } from 'express';
import userRouter from './user/userRouter';
import tweetRouter from './tweet/tweetRouter';

const router = Router();

router.use('/users', userRouter);
router.use('/tweets', tweetRouter);

export default router;
