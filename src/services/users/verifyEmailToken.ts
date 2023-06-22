import { ObjectId } from 'mongodb';
import database from '~/databases';
import { UserVerifyStatus } from '~/enums/user';
import { UserModel } from '~/models/schemas';
import createToken from '~/utils/token.util';

const verifyEmailToken = async (user: UserModel) => {
  const _id = user._id as ObjectId;

  await database.userMethods.updateOneUser({
    _id,
    payload: {
      email_verify_token: '',
      verify: UserVerifyStatus.Verified
    }
  });

  const { token, rfToken } = createToken({
    user_id: _id.toString(),
    verify: UserVerifyStatus.Verified
  });

  return {
    token,
    rfToken
  };
};

export default verifyEmailToken;
