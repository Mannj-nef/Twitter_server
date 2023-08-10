import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { WithId } from 'mongodb';
import { LIKE_MESSAGE } from '~/constants/messages';
import { TokenPayload } from '~/interfaces/requests';
import { ILikeRequest } from '~/interfaces/requests/like.request';
import { IResponse, IResponseResult } from '~/interfaces/response';
import LikeTweetModel from '~/models/schemas/LikeTweet';
import likeTweetService from '~/services/likeTweet';

const likeController = {
  likeTweet: async (
    req: Request<ParamsDictionary, Response<IResponseResult<WithId<LikeTweetModel>>>, ILikeRequest>,
    res: Response<IResponseResult<WithId<LikeTweetModel>>>
  ) => {
    const { tweet_id } = req.body;
    const { user_id } = req.decoded_token as TokenPayload;

    const result = await likeTweetService.likeTweet({ user_id, tweet_id });

    return res.json({
      message: LIKE_MESSAGE.LIKE_TWEET_SUCCESSFULLY,
      result
    });
  },

  unlikeTweet: async (req: Request, res: Response<IResponse>) => {
    const { tweet_id } = req.params;
    const { user_id } = req.decoded_token as TokenPayload;

    await likeTweetService.unLikeTweet({ user_id, tweet_id });

    return res.json({
      message: LIKE_MESSAGE.UN_LIKE_TWEET_SUCCESSFULLy
    });
  }
};

export default likeController;
