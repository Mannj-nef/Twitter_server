import { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from '~/constants/httpStatus';
import { USERS_MESSAGES } from '~/constants/messages';
import { UserVerifyStatus } from '~/enums/user';

const verifyStatusUser = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    });
  }

  if (user.verify !== UserVerifyStatus.Verified) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      message: USERS_MESSAGES.USER_NOT_VERIFIED
    });
  }

  next();
};

export default verifyStatusUser;
