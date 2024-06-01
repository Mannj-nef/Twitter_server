import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import HTTP_STATUS from '~/constants/httpStatus';
import { USERS_MESSAGES } from '~/constants/messages';
import database from '~/databases';
import { UserVerifyStatus } from '~/enums';
import { IEmailTokenRequesBody } from '~/interfaces/requests';
import { verifyToken } from '~/utils/token.util';

// verify email token
const verifyEmailToken = async (req: Request, res: Response, next: NextFunction) => {
  const { email_verify_token } = req.body as IEmailTokenRequesBody;

  try {
    const { user_id } = verifyToken({
      token: email_verify_token,
      statusCodeError: HTTP_STATUS.UNAUTHORIZED,
      secretKey: process.env.JWT_EMAIL_VERIFY_TOKEN as string
    });

    const _id = new ObjectId(user_id);
    const user = await database.userMethods.findUser({ filter: { _id } });

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: USERS_MESSAGES.USER_NOT_FOUND
      });
    }

    if (user.verify === UserVerifyStatus.Verified) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
      });
    }

    if (email_verify_token !== user.email_verify_token) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
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
