import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import HTTP_STATUS from '~/constants/httpStatuss';
import { USERS_MESSAGES } from '~/constants/messages';
import { TokenPayload } from '~/interfaces/requests';
import {
  IFollowUserRequestBody,
  IGetFollowerRewuestBody,
  IGetFollowingRequestBody
} from '~/interfaces/requests';
import { IResponse, IResponseResult } from '~/interfaces/response';
import { FollowerModel } from '~/models/schemas';
import followService from '~/services/follow';

const followController = {
  // [GET] /following
  following: async (
    req: Request<ParamsDictionary, IResponseResult<FollowerModel[]>, IGetFollowingRequestBody>,
    res: Response<IResponseResult<FollowerModel[]>>
  ) => {
    const { user_id } = req.body;
    const result = await followService.following(user_id);
    return res.status(HTTP_STATUS.OK).json({
      message: 'success',
      result
    });
  },

  // [GET] /follower
  follower: async (
    req: Request<ParamsDictionary, IResponseResult<FollowerModel[]>, IGetFollowerRewuestBody>,
    res: Response<IResponseResult<FollowerModel[]>>
  ) => {
    const { followed_user_id } = req.body;

    const result = await followService.followers(followed_user_id);
    return res.status(HTTP_STATUS.OK).json({
      message: 'success',
      result
    });
  },

  // [POST]-------------------------------------------------------

  // [PORT] /follow
  follow: async (
    req: Request<ParamsDictionary, IResponseResult<FollowerModel[]>, IFollowUserRequestBody>,
    res: Response<IResponse>
  ) => {
    const { followed_user_id } = req.body;
    const { user_id } = req.decoded_token as TokenPayload;

    const followPayload = {
      followed_user_id,
      user_id
    };

    const follower = await followService.follow(followPayload);

    if (follower) {
      return res.status(HTTP_STATUS.OK).json({
        message: USERS_MESSAGES.FOLLOW_USER_AREADY_SUCCESS
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.FOLLOW_USER_SUCCESS
    });
  },

  // [DELETE]-------------------------------------------------------

  // [DELETE] /follow
  unFollow: async (req: Request, res: Response<IResponse>) => {
    const { followed_user_id } = req.params;
    const { user_id } = req.decoded_token as TokenPayload;

    const payload = {
      followed_user_id,
      user_id
    };

    const follower = await followService.unfollow(payload);

    if (!follower) {
      return res.status(HTTP_STATUS.OK).json({
        message: USERS_MESSAGES.UNFOLLOW_USER_AREADY_SUCCESS
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.UNFOLLOW_USER_SUCCESS
    });
  }
};

export default followController;
