import tweetController from '~/controllers/tweetController';
import { Router } from 'express';
import middlewaresAuth from '~/middlewares/auth';
import tweetValidate from '~/middlewares/tweet';
import wrapRequestHandle from '~/utils/wrapRequest.util';

//  Path: /tweets
const tweetRouter = Router();

// [GET]
tweetRouter.get('/', tweetController.getAll);

/**
 * [PORT]
 * Path: /
 * Body: {
 *      type: TweetType,
 *      audience: TweetAudience,
 *      content: string,
 *      parent_id: null | string,
 *
 *      hashtags: string[].
 *      mentions: string[],
 *      medias: IMedia[]
 *  }
 * Response: { message: string }
 */
tweetRouter.post(
  '/',
  middlewaresAuth.authentication,
  middlewaresAuth.verifyStatusUser,
  tweetValidate.createTweet,
  wrapRequestHandle(tweetController.createTweer)
);

/**
 * [DELETE]
 * Path: /:tweet_id
 * Response: { message: string }
 */
tweetRouter.delete(
  '/:tweet_id',
  middlewaresAuth.authentication,
  middlewaresAuth.verifyStatusUser,
  tweetValidate.deleteTweet,
  wrapRequestHandle(tweetController.deleteTweet)
);

export default tweetRouter;
