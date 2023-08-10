import { Router } from 'express';
import likeController from '~/controllers/likeController';
import middlewaresAuth from '~/middlewares/auth';
import likeValidate from '~/middlewares/likes';
import wrapRequestHandle from '~/utils/wrapRequest.util';

const likeRouter = Router();

/**
 * [POST]
 * Path: /
 * Header: {Authorization: 'Bearer <access_token>'}
 * Body: { tweet_id: string }
 * Response: { message: string,  result : ILike }
 */
likeRouter.post(
  '/',
  middlewaresAuth.authentication,
  middlewaresAuth.verifyStatusUser,
  likeValidate.likeTweet,
  wrapRequestHandle(likeController.likeTweet)
);

/**
 * [DELETE]
 * Path: /:tweet_id
 * Header: {Authorization: 'Bearer <access_token>'}
 * Response: { message: string }
 */
likeRouter.delete(
  '/:tweet_id',
  middlewaresAuth.authentication,
  middlewaresAuth.verifyStatusUser,
  likeValidate.likeTweet,
  wrapRequestHandle(likeController.unlikeTweet)
);

export default likeRouter;
