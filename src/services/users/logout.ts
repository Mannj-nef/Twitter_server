import HTTP_STATUS from '~/constants/httpStatuss';
import { USERS_MESSAGES } from '~/constants/messages';
import database from '~/databases';
import { CustomError } from '~/models/errors';

const logout = async (rfToken: string) => {
  const refreshToken = await database.refreshTokensMethods.findRfToken(rfToken);

  if (!refreshToken) {
    throw new CustomError({
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: USERS_MESSAGES.USED_REFRESH_TOKEN_OR_NOT_EXIST
    });
  }

  await database.refreshTokensMethods.deleteRfToken(rfToken);
};

export default logout;
