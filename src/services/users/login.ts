import { ObjectId } from 'mongodb';
import database from '~/databases';
import { UserVerifyStatus } from '~/enums/user';
import { RefreshTokenModel } from '~/models/schemas';
import createToken, { verifyToken } from '~/utils/token.util';
import dotenv from 'dotenv';

dotenv.config();

const login = async (payload: { user_id: string; verify: UserVerifyStatus }) => {
  const { rfToken, token } = createToken(payload);

  const { exp, iat } = verifyToken({
    token: rfToken,
    secretKey: process.env.JWT_REFRESH_TOKEN as string
  });

  await database.refreshTokensMethods.insertRfToken(
    new RefreshTokenModel({
      rfToken,
      user_id: new ObjectId(payload.user_id),
      exp,
      iat
    })
  );

  return { token, rfToken };
};

export default login;
