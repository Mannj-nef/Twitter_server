import { ObjectId } from 'mongodb';
import database from '~/databases';
import { UserVerifyStatus } from '~/enums/user';
import { IRegisterRequestBody } from '~/interfaces/requests';
import { UserModel } from '~/models/schemas';
import { handleHashPassword } from '~/utils/password.util';
import { signEmailToken } from '~/utils/token.util';

const register = async (payload: IRegisterRequestBody) => {
  const user_id = new ObjectId();

  const email_verify_token = signEmailToken({
    user_id: user_id.toString(),
    verify: UserVerifyStatus.Unverified
  });

  const newUser = {
    ...payload,
    _id: user_id,
    email_verify_token,
    email: payload.email.toLowerCase().trim(),
    date_of_birth: new Date(payload.date_of_birth),
    password: handleHashPassword(payload.password)
  };

  await database.userMethods.insertOneUser(new UserModel(newUser));

  /**
   * send email to verify
   * util send email
   */
  console.log('email_verify_token', email_verify_token);

  return;
};

export default register;
