import database from '~/databases';
import { UserVerifyStatus } from '~/enums/user';
import { IRegisterReqBody } from '~/interfaces/requests/user.requests';
import UserModel from '~/models/schemas/User';
import { handleHashPassword } from '~/utils/password.util';
import { createToken } from '~/utils/token.util';

class UserServices {
  register = async (payload: IRegisterReqBody) => {
    const newUser = {
      ...payload,
      date_of_birth: new Date(payload.date_of_birth),
      password: handleHashPassword(payload.password)
    };

    const user = await database.users.insertOne(new UserModel(newUser));

    const { token, rfToken } = createToken({
      user_id: user.insertedId.toString(),
      verify: UserVerifyStatus.Unverified
    });

    return { token, rfToken };
  };

  checkExistEmail = async (email: string) => {
    const user = await database.users.findOne({ email });
    return Boolean(user);
  };
}

const userServices = new UserServices();
export default userServices;
