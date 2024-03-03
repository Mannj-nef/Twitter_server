import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { WithId } from 'mongodb';
import HTTP_STATUS from '~/constants/httpStatuss';
import { TWEETS_MESSAGES } from '~/constants/messages';
import { TweetType } from '~/enums/tweet';
import { ITweetCircleRequestBody, ITweetRequestBody, TokenPayload } from '~/interfaces/requests';
import { IResponse, IResponseResult } from '~/interfaces/response';
import TweetModel from '~/models/schemas/Tweet';
import TweetCircleModel from '~/models/schemas/TweetCircle';
import tweetServices from '~/services/tweets';

const tweetController = {
  // [GET] /
  getTweets: async (req: Request, res: Response) => {
    const { limit, page } = req.query;

    const limitData = limit ? Number(limit) : 10;
    const pageDate = page ? Number(page) : 1;

    const tweets = await tweetServices.getTweets({
      limit: limitData,
      page: pageDate,
      user_id: req.decoded_token?.user_id as string
    });

    return res.json({
      message: TWEETS_MESSAGES.GET_NEW_TWEETS_SUCCESS,
      result: {
        limit: limitData,
        page: pageDate,
        tweets
      }
    });
  },

  // [GET] /:tweet_id
  getTweetDetail: async (req: Request, res: Response<IResponseResult<TweetModel>>) => {
    const tweet = req.tweet as TweetModel;
    const resultTweetView = await tweetServices.increaseView({
      tweet_id: `${tweet._id}`,
      user_id: `${tweet.user_id}`
    });

    return res.json({
      message: TWEETS_MESSAGES.GET_TWEET_SUCCESS,
      result: {
        ...tweet,
        user_views: resultTweetView.user_views,
        guest_views: resultTweetView.guest_views,
        updated_at: resultTweetView.updated_at
      }
    });
  },

  // [GET] /:tweet_id/children
  getTweetChildren: async (req: Request, res: Response) => {
    const { tweet_type, limit, page } = req.query;

    const limitData = limit ? Number(limit) : 10;
    const pageDate = page ? Number(page) : 1;

    const { totalPage, tweets } = await tweetServices.getChildren({
      tweet_type: `${tweet_type}` as TweetType,
      tweet_id: req.params.tweet_id,
      user_id: req.decoded_token?.user_id,
      limit: limitData,
      page: pageDate
    });

    return res.json({
      message: TWEETS_MESSAGES.GET_TWEET_SUCCESS,
      result: {
        totalPage: Math.ceil(Number(totalPage) / Number(limitData)),
        limit: limitData,
        page: pageDate,
        tweets
      }
    });
  },

  // [PORT] /
  createTweet: async (
    req: Request<ParamsDictionary, IResponseResult<ITweetRequestBody>, ITweetRequestBody>,
    res: Response<IResponseResult<ITweetRequestBody>>
  ) => {
    const { user_id } = req.decoded_token as TokenPayload;
    const result = await tweetServices.createTweet({ user_id, tweet: req.body });

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

    const result = await tweetServices.createCircle({ user_id, user_id_tweetCircle });

    return res.json({
      message: TWEETS_MESSAGES.CREATE_CIRCLE_SUCCESS,
      result
    });
  },

  // [DELETE] /circle/:user_id_tweetCircle
  deleteTweetCircle: async (req: Request, res: Response<IResponse>) => {
    const { user_id_tweetCircle } = req.params;
    const { user_id } = req.decoded_token as TokenPayload;

    const isTweetCircleExisted = await tweetServices.checkTweetCircleExisted({
      user_id,
      user_id_tweetCircle
    });

    if (!isTweetCircleExisted) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: TWEETS_MESSAGES.USER_NOT_IN_CIRCLE_TWEET
      });
    }

    await tweetServices.deleteCircle({ user_id, user_id_tweetCircle });

    return res.json({
      message: TWEETS_MESSAGES.DELETE_CIRCLE_SUCCESS
    });
  },

  // [DELETE] /:tweet_id
  deleteTweet: async (req: Request, res: Response<IResponse>) => {
    const { tweet_id } = req.params;
    const { user_id } = req.decoded_token as TokenPayload;

    const tweetExisted = await tweetServices.checkTweetExisted({
      tweet_id,
      user_id
    });

    if (!tweetExisted) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: `${TWEETS_MESSAGES.TWEET_NOT_FOUND} or ${TWEETS_MESSAGES.YOU_CANT_DELETE_TWEET}`
      });
    }

    await tweetServices.deleteTweet({ user_id, tweet_id });

    return res.json({
      message: TWEETS_MESSAGES.DELETE_TWEET_SUCCESS
    });
  }
};

export default tweetController;
