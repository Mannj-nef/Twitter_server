import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import HTTP_STATUS from '~/constants/httpStatuss';
import { USERS_MESSAGES } from '~/constants/messages';
import database from '~/databases';
import { IVerifyForgotPasswordTokenRequestBody } from '~/interfaces/requests';
import { verifyToken } from '~/utils/token.util';

const verifyForgotPassWordToken = async (req: Request, res: Response, next: NextFunction) => {
  const { forgot_password_token } = req.body as IVerifyForgotPasswordTokenRequestBody;

  try {
    const decoded = verifyToken({
      token: forgot_password_token,
      secretKey: process.env.JWT_FORGOT_PASSWORD_TOKEN as string
    });

    const _id = new ObjectId(decoded.user_id);
    const user = await database.userMethods.findUser({
      filter: {
        _id
      }
    });

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: USERS_MESSAGES.USER_NOT_FOUND
      });
    }

    if (forgot_password_token !== user.forgot_password_token) {
      return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
        message: USERS_MESSAGES.FORGOT_PASSWORD_TOKEN_INVALID
      });
    }

    req.decoded_token = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

export default verifyForgotPassWordToken;
