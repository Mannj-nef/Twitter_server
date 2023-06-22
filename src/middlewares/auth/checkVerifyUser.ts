import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import HTTP_STATUS from '~/constants/httpStatuss';
import { USERS_MESSAGES } from '~/constants/messages';
import database from '~/databases';
import { UserVerifyStatus } from '~/enums/user';
import { TokenPayload } from '~/interfaces/requests';

const checkVerifyUser = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_token as TokenPayload;
  const _id = new ObjectId(user_id);

  const user = await database.userMethods.findUserById({ _id });

  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    });
  }

  if (user.verify === UserVerifyStatus.Verified) {
    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    });
  }

  next();
};

export default checkVerifyUser;
