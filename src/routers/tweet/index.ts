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
  wrapRequestHandle(tweetController.createTweet)
);

/**
 * [PORT]
 * Path: /circle
 * Body: { user_id_tweetCircle: string[] } maxLength: 150
 * Response: { message: string, result: TweetCircleModel }
 */
tweetRouter.post(
  '/circle',
  middlewaresAuth.authentication,
  middlewaresAuth.verifyStatusUser,
  tweetValidate.validateTweetCircle,
  wrapRequestHandle(tweetController.createTweetCircle)
);

/**
 * [DELETE]
 * Path: /circle/:user_id_tweetCircle
 * Response: { message: string }
 */
tweetRouter.delete(
  '/circle/:user_id_tweetCircle',
  middlewaresAuth.authentication,
  middlewaresAuth.verifyStatusUser,
  tweetValidate.validateTweetCircle,
  wrapRequestHandle(tweetController.deleteTweetCircle)
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
