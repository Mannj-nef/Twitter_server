import database from '~/databases';
import { UserVerifyStatus } from '~/enums/user';
import { IRegisterRequestBody } from '~/interfaces/requests/user.requests';
import UserModel from '~/models/schemas/User';
import { handleHashPassword } from '~/utils/password.util';
import { createToken } from '~/utils/token.util';

class UserServices {
  register = async (payload: IRegisterRequestBody) => {
    const newUser = {
      ...payload,
      date_of_birth: new Date(payload.date_of_birth),
      password: handleHashPassword(payload.password)
    };

    await database.userMethods.insertOneUser(new UserModel(newUser));

    return;
  };

  login = async (payload: { user_id: string; verify: UserVerifyStatus }) => {
    const { rfToken, token } = createToken(payload);

    return { token, rfToken };
  };
}

const userServices = new UserServices();
export default userServices;
