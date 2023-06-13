import database from '~/databases';
import { IRegisterReqBody } from '~/interfaces/requests/user.requests';
import UserModel from '~/models/schemas/User';
import { handleHashPassword } from '~/utils/handlePassword';

class UserServices {
  register = async (payload: IRegisterReqBody) => {
    const newUser = {
      ...payload,
      date_of_birth: new Date(payload.date_of_birth),
      password: handleHashPassword(payload.password)
    };

    const result = await database.users.insertOne(new UserModel(newUser));

    return result;
  };

  checkExistEmail = async (email: string) => {
    const user = await database.users.findOne({ email });
    return Boolean(user);
  };
}

const userServices = new UserServices();
export default userServices;
