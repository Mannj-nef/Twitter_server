import { Request, Response } from 'express';
import HTTP_STATUS from '~/constants/httpStatuss';
import { USERS_MESSAGES } from '~/constants/messages';
import { ILogoutRequestBody, IRegisterRequestBody } from '~/interfaces/requests';
import { TokenPayload } from '~/interfaces/requests';
import { UserModel } from '~/models/schemas';
import userServices from '~/services/user';

const userController = {
  // [GET] /users
  getall: (rep: Request, res: Response) => {
    res.json('user router');
  },

  // [PORT] /users/login
  login: async (req: Request, res: Response) => {
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
  register: async (req: Request, res: Response) => {
    await userServices.register(req.body as IRegisterRequestBody);

    return res.status(HTTP_STATUS.CREATED).json({
      message: USERS_MESSAGES.REGISTER_SUCCESS
    });
  },

  // [PORT] /users/logout
  logout: async (req: Request, res: Response) => {
    const { refreshToken } = req.body as ILogoutRequestBody;

    await userServices.logout(refreshToken);

    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.LOGOUT_SUCCESS
    });
  },

  // [PORT] /users/verify-email
  verifyEmail: async (req: Request, res: Response) => {
    const user = req.user as UserModel;

    const { token, rfToken } = await userServices.verifyEmail(user);

    return res.status(200).json({
      message: 'success',
      accessToken: token,
      refreshToken: rfToken
    });
  },

  // [PORT] /user/send-email
  sendEmail: async (req: Request, res: Response) => {
    const { user_id } = req.decoded_token as TokenPayload;

    await userServices.resendVerifyEmail(user_id);

    return res.status(200).json({
      message: 'success'
    });
  }
};

export default userController;
