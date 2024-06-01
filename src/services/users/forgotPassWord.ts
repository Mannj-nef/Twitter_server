import { ObjectId } from 'mongodb';
import database from '~/databases';
import { UserVerifyStatus } from '~/enums/user';
import sendEmail from '~/utils/sesSendEmail.util';
import { signForgotPassToken } from '~/utils/token.util';

const forgotPassword = async ({
  verify,
  user_id
}: {
  user_id: string;
  verify: UserVerifyStatus;
}) => {
  const token = signForgotPassToken({
    user_id,
    verify: verify || UserVerifyStatus.Unverified
  });

  const _id = new ObjectId(user_id);

  await database.userMethods.updateOneUser({
    _id,
    payload: {
      forgot_password_token: token
    }
  });

  //   send email forgot
  sendEmail({
    body: `hello this is email from ses aws <a href=${process.env.CLIENT_URL}/update-password?token=${token}>link</a>`,
    subject: 'forgot password',
    toAddress: 'manhquan.05012002@gmail.com'
  });
  return;
};

export default forgotPassword;
