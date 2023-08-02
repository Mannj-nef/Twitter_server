import { ObjectId } from 'mongodb';
import database from '~/databases';
import { TokenPayload } from '~/interfaces/requests';
import { RefreshTokenModel } from '~/models/schemas';
import createToken from '~/utils/token.util';

const refrestToken = async ({
  refreshToken,
  tokenDecoded
}: {
  refreshToken: string;
  tokenDecoded: TokenPayload;
}) => {
  const { user_id, verify, exp, iat } = tokenDecoded;

  const { rfToken, token } = createToken({ user_id, verify });

  await Promise.all([
    database.refreshTokensMethods.deleteRfToken(refreshToken),
    database.refreshTokensMethods.insertRfToken(
      new RefreshTokenModel({
        rfToken,
        user_id: new ObjectId(user_id),
        exp: exp as number,
        iat: iat as number
      })
    )
  ]);

  return { rfToken, token };
};

export default refrestToken;
