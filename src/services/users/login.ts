import { ObjectId } from 'mongodb';
import database from '~/databases';
import { UserVerifyStatus } from '~/enums/user';
import { RefreshTokenModel } from '~/models/schemas';
import createToken from '~/utils/token.util';

const login = async (payload: { user_id: string; verify: UserVerifyStatus }) => {
  const { rfToken, token } = createToken(payload);

  await database.refreshTokensMethods.insertRfToken(
    new RefreshTokenModel({ rfToken, user_id: new ObjectId(payload.user_id) })
  );

  return { token, rfToken };
};

export default login;
