import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from '~/constants/httpStatuss';
import { USERS_MESSAGES } from '~/constants/messages';
import { TokenPayload } from '~/interfaces/requests';
import { CustomError } from '~/models/errors';
import { verifyAccessToken } from '~/utils/token.util';

dotenv.config();

const authentication = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization;

  // check token empty
  if (!bearerToken) {
    return next(
      new CustomError({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
      })
    );
  }

  const [bearer, token] = bearerToken.split(' ');

  //   check format token must have 'Bearer ${token}'
  if (bearer !== 'Bearer' || !token) {
    return next(
      new CustomError({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: USERS_MESSAGES.TOKEN_INVALID_FORMAT
      })
    );
  }

  const decoded = verifyAccessToken({ token, secretKey: process.env.JWT_ACCESS_TOKEN as string });

  req.decoded_token = decoded as TokenPayload;

  next();
};

export default authentication;
