import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import HTTP_STATUS from '~/constants/httpStatus';
import { USERS_MESSAGES } from '~/constants/messages';
import database from '~/databases';
import { IEmailTokenRequesBody } from '~/interfaces/requests';
import { verifyToken } from '~/utils/token.util';

// veriry email token
const verifyEmailToken = async (req: Request, res: Response, next: NextFunction) => {
  const { email_verify_token } = req.body as IEmailTokenRequesBody;

  if (!email_verify_token) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: USERS_MESSAGES.EMAIL_VERIFY_TOKEN_IS_REQUIRED,
      path: 'email_verify_token'
    });
  }

  try {
    const { user_id } = verifyToken({
      token: email_verify_token,
      secretKey: process.env.JWT_EMAIL_VERIFY_TOKEN as string
    });

    const _id = new ObjectId(user_id);
    const user = await database.userMethods.findUser({ filter: { _id } });

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: USERS_MESSAGES.USER_NOT_FOUND
      });
    }

    if (email_verify_token !== user.email_verify_token) {
      return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
        message: USERS_MESSAGES.EMAIL_VERIFY_TOKEN_INVALID
      });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyEmailToken;
