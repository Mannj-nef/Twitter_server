import { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from '~/constants/httpStatuss';
import { USERS_MESSAGES } from '~/constants/messages';
import database from '~/databases';
import { ILogoutRequestBody } from '~/interfaces/requests';
import { verifyToken } from '~/utils/token.util';

const verifyRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body as ILogoutRequestBody;

  if (!refreshToken) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: USERS_MESSAGES.REFRESH_TOKEN_IS_REQUIRED,
      path: 'refreshToken'
    });
  }

  try {
    const checkRefreshExistsedInDatabase = async () => {
      const refreshTokenExistsed = await database.refreshTokensMethods.findRfToken(refreshToken);

      if (!refreshTokenExistsed) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          message: USERS_MESSAGES.USED_REFRESH_TOKEN_OR_NOT_EXIST
        });
      }

      const decoded = verifyToken({
        token: refreshToken,
        secretKey: process.env.JWT_REFRESH_TOKEN as string
      });

      req.decoded_token = decoded;

      next();
    };
    checkRefreshExistsedInDatabase();
  } catch (error) {
    next(error);
  }
};

export default verifyRefreshToken;
