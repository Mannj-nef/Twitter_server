import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import HTTP_STATUS from '~/constants/httpStatuss';
import { USERS_MESSAGES } from '~/constants/messages';
import database from '~/databases';
import { TokenPayload } from '~/interfaces/requests';
import { CustomError } from '~/models/errors';
import { verifyToken } from '~/utils/token.util';

dotenv.config();

const authentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
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

    const decoded = verifyToken({ token, secretKey: process.env.JWT_ACCESS_TOKEN as string });

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

    req.user = user;
    req.decoded_token = decoded as TokenPayload;

    next();
  } catch (error) {
    next(error);
  }
};

export default authentication;
