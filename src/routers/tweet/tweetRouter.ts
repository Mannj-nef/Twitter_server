import tweetController from '~/controllers/tweetController';
import { Router } from 'express';
import middlewaresAuth from '~/middlewares/auth';
import validate from '~/middlewares/tweet';

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
 *      hashtags?: string[].
 *      mentions?: string[],
 *      medias?: IMedia[]
 *  }
 * Response: { message: string }
 */
tweetRouter.post('/', middlewaresAuth.authentication, tweetController.createTweer);

export default tweetRouter;
