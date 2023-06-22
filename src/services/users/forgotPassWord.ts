import { ObjectId } from 'mongodb';
import database from '~/databases';
import { UserVerifyStatus } from '~/enums/user';
import { signForgotPassToken } from '~/utils/token.util';

const forgotPassword = async (user_id: string) => {
  const token = signForgotPassToken({ user_id, verify: UserVerifyStatus.Unverified });

  const _id = new ObjectId(user_id);

  await database.userMethods.updateOneUser({
    _id,
    payload: {
      forgot_password_token: token
    }
  });

  //   send email
  console.log({ token });

  return;
};

export default forgotPassword;
