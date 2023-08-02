import { ObjectId } from 'mongodb';
import database from '~/databases';
import { UserVerifyStatus } from '~/enums/user';
import { getUserGoogeInfor } from '~/utils/oauth.util';
import createToken, { verifyToken } from '~/utils/token.util';
import register from './register';
import { RefreshTokenModel } from '~/models/schemas';
import dotenv from 'dotenv';

dotenv.config();

const oauth = async (code: string) => {
  const userGoogleInfor = await getUserGoogeInfor(code);

  const user = await database.userMethods.findUser({ filter: { email: userGoogleInfor.email } });

  if (user) {
    if (user.verify === UserVerifyStatus.Banned) return;

    await database.userMethods.updateOneUser({
      _id: user._id as ObjectId,
      payload: {
        verify: UserVerifyStatus.Verified
      }
    });

    const { token, rfToken } = createToken({
      user_id: (user._id as ObjectId).toString(),
      verify: UserVerifyStatus.Verified
    });

    const { exp, iat } = verifyToken({
      token: rfToken,
      secretKey: process.env.JWT_REFRESH_TOKEN as string
    });

    await database.refreshTokensMethods.insertRfToken(
      new RefreshTokenModel({ rfToken, user_id: user._id as ObjectId, exp, iat })
    );

    return {
      token,
      rfToken
    };
  } else {
    const { rfToken, token } = await register({
      email: userGoogleInfor.email,
      name: userGoogleInfor.name,
      date_of_birth: new Date().toString(),
      confirm_password: userGoogleInfor.sub,
      password: userGoogleInfor.sub
    });

    return {
      rfToken,
      token
    };
  }
};

export default oauth;
