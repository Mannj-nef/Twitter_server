import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UserVerifyStatus } from '~/enums/user';

dotenv.config();

interface IDataToken {
  user_id: string;
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

const createToken = (user: IDataToken) => {
  const data: IDataToken = {
    user_id: user.user_id,
    verify: user.verify
  };

  const token = signAccessToken(data);
  const rfToken = signRefreshToken(data);

  return { token, rfToken };
};

export default createToken;
