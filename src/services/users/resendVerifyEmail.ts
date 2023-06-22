import { ObjectId } from 'mongodb';
import database from '~/databases';
import { UserVerifyStatus } from '~/enums/user';
import { signEmailToken } from '~/utils/token.util';

const resendVerifyEmail = async (user_id: string) => {
  // update verifyemail
  const token = signEmailToken({ user_id, verify: UserVerifyStatus.Unverified });

  await database.userMethods.updateOneUser({
    _id: new ObjectId(user_id),
    payload: {
      email_verify_token: token
    }
  });

  // resend email
  console.log({ token });
};

export default resendVerifyEmail;
