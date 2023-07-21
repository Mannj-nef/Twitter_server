import { ObjectId } from 'mongodb';
import database from '~/databases';
import { UserVerifyStatus } from '~/enums/user';
import { getUserGoogelInfor } from '~/utils/oauth.util';
import createToken from '~/utils/token.util';
import register from './register';
import { RefreshTokenModel } from '~/models/schemas';

const oauth = async (code: string) => {
  const userGoogleInfor = await getUserGoogelInfor(code);

  const user = await database.userMethods.findUser({ filter: { email: userGoogleInfor.email } });

  if (user) {
    if (user.verify === UserVerifyStatus.Banned) return;

    await database.userMethods.updateOneUser({
      _id: user._id as ObjectId,
      payload: {
        verify: user.verify
      }
    });

    const { token, rfToken } = createToken({
      user_id: (user._id as ObjectId).toString(),
      verify: user.verify
    });

    await database.refreshTokensMethods.insertRfToken(
      new RefreshTokenModel({ rfToken, user_id: user._id as ObjectId })
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
