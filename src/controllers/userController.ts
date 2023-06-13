import { Request, Response } from 'express';
import HTTP_STATUS from '~/constants/httpStatuss';
import { USERS_MESSAGES } from '~/constants/messages';
import { IRegisterReqBody } from '~/interfaces/requests/user.requests';
import userServices from '~/services/user';

const userController = {
  // [GET] /users
  getall: (rep: Request, res: Response) => {
    res.json('user router');
  },

  // [PORT] /users/login
  login: (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (email === 'manhquan' && password === '123') {
      return res.json({ email, password, message: USERS_MESSAGES.LOGIN_SUCCESS });
    }

    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: 'login failed'
    });
  },

  // [PORT] /users/register
  register: async (req: Request, rep: Response) => {
    try {
      const result = await userServices.register(req.body as IRegisterReqBody);

      return rep.status(HTTP_STATUS.CREATED).json({
        ...result,
        message: USERS_MESSAGES.REGISTER_SUCCESS
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
};

export default userController;
