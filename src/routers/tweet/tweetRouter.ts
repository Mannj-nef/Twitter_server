import tweetController from '~/controllers/tweetController';
import { Router } from 'express';
import middlewaresAuth from '~/middlewares/auth';
import validate from '~/middlewares/tweet';
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
  tweetValidate.createTweet,
  wrapRequestHandle(tweetController.createTweer)
);

export default tweetRouter;
