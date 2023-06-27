import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import HTTP_STATUS from '~/constants/httpStatuss';
import { USERS_MESSAGES } from '~/constants/messages';
import { UserVerifyStatus } from '~/enums/user';
import {
  IFollowRequestBody,
  IGetProfileParamBody,
  ILogoutRequestBody,
  IRegisterRequestBody,
  IResetPasswordRequestBody,
  IUpdateMeRequestBody
} from '~/interfaces/requests';
import { TokenPayload } from '~/interfaces/requests';
import { IResponse, IResponseResult, IResponseToken } from '~/interfaces/response';
import { UserModel } from '~/models/schemas';
import userServices from '~/services/user';

const userController = {
  // [GET] /users/me
  getMe: async (rep: Request, res: Response<IResponseResult<UserModel>>) => {
    const { user_id } = rep.decoded_token as TokenPayload;

    const result = (await userServices.getMe(user_id)) as UserModel;

    return res.json({
      message: USERS_MESSAGES.GET_USER_SUCCESS,
      result
    });
  },

  // [GET] /user/:username
  getProfile: async (
    req: Request<IGetProfileParamBody>,
    res: Response<IResponseResult<UserModel> | IResponse>
  ) => {
    const { username } = req.params;

    const result = await userServices.getProfile(username);

    if (!result) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: USERS_MESSAGES.USER_NOT_FOUND
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.GET_USER_SUCCESS,
      result
    });
  },

  // [PORT]---------------------------------------------

  // [PORT] /users/login
  login: async (req: Request, res: Response<IResponseToken>) => {
    const { _id, verify } = req.user as UserModel;
    const user_id = _id?.toString() as string;

    const { rfToken, token } = await userServices.login({ verify, user_id });

    return res.status(HTTP_STATUS.ACCEPTED).json({
      message: USERS_MESSAGES.LOGIN_SUCCESS,
      access_token: token,
      refresh_token: rfToken
    });
  },

  // [PORT] /users/register
  register: async (req: Request, res: Response<IResponse>) => {
    await userServices.register(req.body as IRegisterRequestBody);

    return res.status(HTTP_STATUS.CREATED).json({
      message: USERS_MESSAGES.REGISTER_SUCCESS
    });
  },

  // [PORT] /users/logout
  logout: async (req: Request, res: Response<IResponse>) => {
    const { refreshToken } = req.body as ILogoutRequestBody;

    await userServices.logout(refreshToken);

    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.LOGOUT_SUCCESS
    });
  },

  // [PORT] /users/verify-email
  verifyEmail: async (req: Request, res: Response<IResponseToken | IResponse>) => {
    const user = req.user as UserModel;

    if (user.verify === UserVerifyStatus.Verified) {
      return res.status(HTTP_STATUS.OK).json({
        message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
      });
    }

    const { token, rfToken } = await userServices.verifyEmail(user);

    return res.status(200).json({
      message: USERS_MESSAGES.VERIFY_EMAIL_TOKEN_SUCCESS,
      access_token: token,
      refresh_token: rfToken
    });
  },

  // [PORT] /user/send-email
  sendEmail: async (req: Request, res: Response<IResponse>) => {
    const { user_id } = req.decoded_token as TokenPayload;
    const user = req.user as UserModel;

    if (user.verify === UserVerifyStatus.Verified) {
      return res.status(HTTP_STATUS.OK).json({
        message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
      });
    }

    await userServices.resendVerifyEmail(user_id);

    return res.status(200).json({
      message: USERS_MESSAGES.RESED_EMAIL_SUCCESS
    });
  },

  // [PORT] /user/forgot-password
  forgotPassword: async (req: Request, res: Response<IResponse>) => {
    const { _id } = req.user as UserModel;
    const user_id = (_id as ObjectId).toString();

    await userServices.forgotPassword(user_id);

    return res.status(200).json({
      message: USERS_MESSAGES.FORGOT_PASSWORD_TOKEN_SUCCESS
    });
  },

  // [PORT] /user/verify-forgot-password
  verifyForgotPassWord: async (req: Request, res: Response<IResponse>) => {
    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS
    });
  },

  // [PORT] /user/reset-password
  resetPassword: async (req: Request, res: Response<IResponse>) => {
    const { password } = req.body as IResetPasswordRequestBody;
    const { user_id } = req.decoded_token as TokenPayload;

    await userServices.resetPassword({ user_id, newPassword: password });

    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.RESET_PASSWORD_SUCCESS
    });
  },

  // [PORT] /user/follow
  follow: async (req: Request, res: Response<IResponse>) => {
    const { followed_user_id } = req.body as IFollowRequestBody;
    const { user_id } = req.decoded_token as TokenPayload;

    const followPayload = {
      followed_user_id,
      user_id
    };

    const follower = await userServices.follow(followPayload);

    if (follower) {
      return res.status(HTTP_STATUS.OK).json({
        message: USERS_MESSAGES.FOLLOW_USER_AREADY_SUCCESS
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.FOLLOW_USER_SUCCESS
    });
  },

  // [PATCH]--------------------------------------------------------

  // [PATCH] /user/me
  updateMe: async (req: Request, res: Response<IResponseResult<UserModel>>) => {
    const { _id } = req.user as Required<UserModel>;

    const result = (await userServices.updateMe({
      _id,
      payload: req.body as IUpdateMeRequestBody
    })) as UserModel;

    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.UPDATE_USER_SUCCESS,
      result
    });
  },

  // [DELETE]-------------------------------------------------------

  // [DELETE] /user/follow
  unFollow: async (req: Request, res: Response<IResponse>) => {
    const { followed_user_id } = req.body as IFollowRequestBody;
    const { user_id } = req.decoded_token as TokenPayload;

    const payload = {
      followed_user_id,
      user_id
    };

    const follower = await userServices.unfollow(payload);

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

export default userController;
