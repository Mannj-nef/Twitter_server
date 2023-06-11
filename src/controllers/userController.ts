import { Request, Response } from 'express';
import HTTP_STATUS from '~/constants/httpStatuss';
import { USERS_MESSAGES } from '~/constants/messages';

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
  register: (req: Request, rep: Response) => {
    rep.json({
      name: '12312'
    });
  }
};

export default userController;
