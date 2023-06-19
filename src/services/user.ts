import { ObjectId } from 'mongodb';
import HTTP_STATUS from '~/constants/httpStatuss';
import { USERS_MESSAGES } from '~/constants/messages';
import database from '~/databases';
import { UserVerifyStatus } from '~/enums/user';
import { IRegisterRequestBody } from '~/interfaces/requests/user.requests';
import { CustomError } from '~/models/errors';
import { RefreshTokenModel, UserModel } from '~/models/schemas/';
import { handleHashPassword } from '~/utils/password.util';
import createToken from '~/utils/token.util';

class UserServices {
  register = async (payload: IRegisterRequestBody) => {
    const newUser = {
      ...payload,
      email: payload.email.toLowerCase().trim(),
      date_of_birth: new Date(payload.date_of_birth),
      password: handleHashPassword(payload.password)
    };

    await database.userMethods.insertOneUser(new UserModel(newUser));

    return;
  };

  login = async (payload: { user_id: string; verify: UserVerifyStatus }) => {
    const { rfToken, token } = createToken(payload);

    await database.refreshTokensMethods.insertRfToken(
      new RefreshTokenModel({ rfToken, user_id: new ObjectId(payload.user_id) })
    );

    return { token, rfToken };
  };

  logout = async (rfToken: string) => {
    const refreshToken = await database.refreshTokensMethods.findRfToken(rfToken);
    if (!refreshToken) {
      throw new CustomError({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: USERS_MESSAGES.USED_REFRESH_TOKEN_OR_NOT_EXIST
      });
    }

    await database.refreshTokensMethods.deleteRfToken(rfToken);
  };
}

const userServices = new UserServices();
export default userServices;
