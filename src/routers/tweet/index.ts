import tweetController from '~/controllers/tweetController';
import { Router } from 'express';
import middlewaresAuth from '~/middlewares/auth';
import tweetValidate from '~/middlewares/tweet';
import wrapRequestHandle from '~/utils/wrapRequest.util';

//  Path: /tweets
const tweetRouter = Router();

/**
 * [GET]
 * Path: /
 * Header: { Authorization: 'Bearer <access_token>' }
 * Response: { message: string, result: TweetModel[] }
 * Query: { limit: number, page: number }
 */
tweetRouter.get(
  '/',
  middlewaresAuth.authentication,
  middlewaresAuth.verifyStatusUser,
  tweetValidate.validateTweetPagination,
  wrapRequestHandle(tweetController.getTweets)
);

/**
 * [GET]
 * Path: /:tweet_id
 * Header: { Authorization: 'Bearer <access_token>' }
 * Response: { message: string, result: TweetModel }
 */
tweetRouter.get(
  '/:tweet_id',
  middlewaresAuth.authentication,
  middlewaresAuth.verifyStatusUser,
  tweetValidate.audienceValidator,
  wrapRequestHandle(tweetController.getTweetDetail)
);

/**
 * [GET]
 * Path: /:tweet_id/children
 * Header: { Authorization: 'Bearer <access_token>' }
 * Response: { message: string, result: TweetModel[] }
 * Query: { limit: number, page: number, type: TweetType }
 */
tweetRouter.get(
  '/:tweet_id/children',
  tweetValidate.tweetChildrenQueryValidation,
  tweetValidate.validateTweetPagination,
  middlewaresAuth.authentication,
  middlewaresAuth.verifyStatusUser,
  tweetValidate.audienceValidator,
  wrapRequestHandle(tweetController.getTweetChildren)
);

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
