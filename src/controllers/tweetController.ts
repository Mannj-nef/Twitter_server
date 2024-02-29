import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { WithId } from 'mongodb';
import HTTP_STATUS from '~/constants/httpStatuss';
import { TWEETS_MESSAGES } from '~/constants/messages';
import { ITweetCircleRequestBody, ITweetRequestBody, TokenPayload } from '~/interfaces/requests';
import { IResponse, IResponseResult } from '~/interfaces/response';
import TweetModel from '~/models/schemas/Tweet';
import TweetCircleModel from '~/models/schemas/TweetCircle';
import tweetSecvices from '~/services/tweets';

const tweetController = {
  // [GET] /tweet
  getTweetDetail: async (rep: Request, res: Response<IResponseResult<TweetModel>>) => {
    const tweet = rep.tweet as TweetModel;
    const resultTweetView = await tweetSecvices.increaseView({
      tweet_id: `${tweet._id}`,
      user_id: `${tweet.user_id}`
    });

    console.log(resultTweetView);

    return res.json({
      message: 'success',
      result: {
        ...tweet,
        user_views: resultTweetView.user_views,
        guest_views: resultTweetView.guest_views,
        updated_at: resultTweetView.updated_at
      }
    });
  },

  // [PORT] /tweet
  createTweet: async (
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

  // [POST] /circle/
  createTweetCircle: async (
    req: Request<
      ParamsDictionary,
      IResponseResult<WithId<TweetCircleModel>>,
      ITweetCircleRequestBody
    >,
    res: Response<IResponseResult<WithId<TweetCircleModel>>>
  ) => {
    const { user_id_tweetCircle } = req.body;
    const { user_id } = req.decoded_token as TokenPayload;

    const result = await tweetSecvices.createCircle({ user_id, user_id_tweetCircle });

    return res.json({
      message: TWEETS_MESSAGES.CREATE_CIRCLE_SUCCESS,
      result
    });
  },

  // [DELETE] /circle/:user_id
  deleteTweetCircle: async (req: Request, res: Response<IResponse>) => {
    const { user_id_tweetCircle } = req.params;
    const { user_id } = req.decoded_token as TokenPayload;

    const isTweetCircleExisted = await tweetSecvices.checkTweetCircleExisted({
      user_id,
      user_id_tweetCircle
    });

    if (!isTweetCircleExisted) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: TWEETS_MESSAGES.USER_NOT_IN_CIRCLE_TWEET
      });
    }

    await tweetSecvices.deleteCircle({ user_id, user_id_tweetCircle });

    return res.json({
      message: TWEETS_MESSAGES.DELETE_CIRCLE_SUCCESS
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
