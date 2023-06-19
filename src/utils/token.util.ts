import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UserVerifyStatus } from '~/enums/user';
import { CustomError } from '~/models/errors';
import { capitalize } from 'lodash';
import { TokenType } from '~/enums/token';

dotenv.config();

interface IDataToken {
  user_id: string;
  token_type?: TokenType;
  verify: UserVerifyStatus;
}

const signAccessToken = (payload: IDataToken) => {
  const token = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN as string, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
  });
  return token;
};

const signRefreshToken = (payload: IDataToken) => {
  const token = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN as string, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
  });
  return token;
};

const verifyAccessToken = ({ token, secretKey }: { token: string; secretKey: string }) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    const { message } = error as Error;

    throw new CustomError({ statusCode: 403, message: capitalize(message) });
  }
};

const createToken = ({ token_type = TokenType.AccessToken, user_id, verify }: IDataToken) => {
  const data: IDataToken = {
    user_id,
    token_type,
    verify
  };

  const token = signAccessToken(data);
  const rfToken = signRefreshToken(data);

  return { token, rfToken };
};

export { verifyAccessToken };
export default createToken;
