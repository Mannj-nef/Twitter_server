import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { TWEETS_MESSAGES } from '~/constants/messages';
import { ITweetRequestBody, TokenPayload } from '~/interfaces/requests';
import { IResponseResult } from '~/interfaces/response';
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
  }
};

export default tweetController;
