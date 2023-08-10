import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import HTTP_STATUS from '~/constants/httpStatuss';
import { TWEETS_MESSAGES } from '~/constants/messages';
import { ITweetRequestBody, TokenPayload } from '~/interfaces/requests';
import { IResponse, IResponseResult } from '~/interfaces/response';
import TweetModel from '~/models/schemas/Tweet';
import tweetSecvices from '~/services/tweets';

const tweetController = {
  // [GET] /tweet
  getAll: (rep: Request, res: Response) => {
    res.json('alo');
  },

  // [PORT] /tweet
  createTweer: async (
    req: Request<ParamsDictionary, IResponseResult<ITweetRequestBody>, ITweetRequestBody>,
    res: Response<IResponseResult<ITweetRequestBody>>
  ) => {
    const { user_id } = req.decoded_token as TokenPayload;
    const result = await tweetSecvices.createTweet({ user_id, tweet: req.body });

    return res.json({
      message: TWEETS_MESSAGES.CREATE_TWEET_SUCCESS,
      result
    });
  },

  // [DELETE] /:tweet_id
  deleteTweet: async (req: Request, res: Response<IResponse>) => {
    const { tweet_id } = req.params;
    const { user_id } = req.decoded_token as TokenPayload;

    const tweetExisted = await tweetSecvices.checkTweetExisted({
      tweet_id,
      user_id
    });

    if (!tweetExisted) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: `${TWEETS_MESSAGES.TWEET_NOT_FOUND} or ${TWEETS_MESSAGES.YOU_CANT_DELETE_TWEET}`
      });
    }

    await tweetSecvices.deleteTweet({ user_id, tweet_id });

    return res.json({
      message: TWEETS_MESSAGES.DELETE_TWEET_SUCCESS
    });
  }
};

export default tweetController;
