import { Request, Response } from 'express';
import HTTP_STATUS from '~/constants/httpStatuss';
import { USERS_MESSAGES } from '~/constants/messages';
import { ILogoutRequestBody, IRegisterRequestBody } from '~/interfaces/requests';
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
      token,
      rfToken
    });
  },

  // [PORT] /users/register
  register: async (req: Request, res: Response) => {
    await userServices.register(req.body as IRegisterRequestBody);

    return res.status(HTTP_STATUS.CREATED).json({
      message: USERS_MESSAGES.REGISTER_SUCCESS
    });
  },

  // [PORT] /user/logout
  logout: async (req: Request, res: Response) => {
    const { refreshToken } = req.body as ILogoutRequestBody;

    await userServices.logout(refreshToken);

    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.LOGOUT_SUCCESS
    });
  }
};

export default userController;
