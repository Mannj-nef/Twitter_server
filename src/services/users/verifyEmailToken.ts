import { ObjectId } from 'mongodb';
import database from '~/databases';
import { UserVerifyStatus } from '~/enums/user';
import { RefreshTokenModel, UserModel } from '~/models/schemas';
import createToken, { verifyToken } from '~/utils/token.util';
import dotenv from 'dotenv';

dotenv.config();

const verifyEmailToken = async (user: UserModel) => {
  const _id = user._id as ObjectId;

  const { token, rfToken } = createToken({
    user_id: _id.toString(),
    verify: UserVerifyStatus.Verified
  });

  const { exp, iat } = verifyToken({
    token: rfToken,
    secretKey: process.env.JWT_REFRESH_TOKEN as string
  });

  await Promise.all([
    database.userMethods.updateOneUser({
      _id,
      payload: {
        email_verify_token: '',
        verify: UserVerifyStatus.Verified
      }
    }),

    database.refreshTokensMethods.insertRfToken(
      new RefreshTokenModel({ user_id: _id, rfToken: token, exp, iat })
    )
  ]);

  return {
    token,
    rfToken
  };
};

export default verifyEmailToken;
