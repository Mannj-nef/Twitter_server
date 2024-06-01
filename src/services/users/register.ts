import { ObjectId } from 'mongodb';
import database from '~/databases';
import { UserVerifyStatus } from '~/enums/user';
import { IRegisterRequestBody } from '~/interfaces/requests';
import { RefreshTokenModel, UserModel } from '~/models/schemas';
import { handleHashPassword } from '~/utils/password.util';
import createToken, { signEmailToken, verifyToken } from '~/utils/token.util';
import dotenv from 'dotenv';
import sendEmail from '~/utils/sesSendEmail.util';

dotenv.config();

const register = async (payload: IRegisterRequestBody) => {
  const user_id = new ObjectId();
  const userName = `${payload.name}-${user_id.toString()}`;

  const email_verify_token = signEmailToken({
    user_id: user_id.toString(),
    verify: UserVerifyStatus.Unverified
  });

  const { token, rfToken } = createToken({
    user_id: user_id.toString(),
    verify: UserVerifyStatus.Verified
  });

  const { exp, iat } = verifyToken({
    token: rfToken,
    secretKey: process.env.JWT_REFRESH_TOKEN as string
  });

  const newUser = {
    ...payload,
    _id: user_id,
    username: userName,
    email_verify_token,
    email: payload.email.toLowerCase().trim(),
    date_of_birth: new Date(payload.date_of_birth),
    password: handleHashPassword(payload.password)
  };

  await database.userMethods.insertOneUser(new UserModel(newUser));
  await database.refreshTokensMethods.insertRfToken(
    new RefreshTokenModel({ rfToken, user_id, exp, iat })
  );

  /**
   * send email to verify
   * util send email
   */
  console.log({ email_verify_token });
  sendEmail({
    body: `hello this is email from ses aws <a href=${process.env.CLIENT_URL}/verify-email?token=${email_verify_token}>link</a>`,
    subject: 'verify email',
    toAddress: 'manhquan.05012002@gmail.com'
  });

  return {
    token,
    rfToken
  };
};

export default register;
