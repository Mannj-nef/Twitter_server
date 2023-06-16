import jwt from 'jsonwebtoken';
import { UserVerifyStatus } from '~/enums/user';

interface IDataToken {
  user_id: string;
  verify: UserVerifyStatus;
}

const accessToken = (payload: IDataToken) => {
  const token = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN as string, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
  });
  return token;
};

const refreshToken = (payload: IDataToken) => {
  const token = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN as string, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
  });
  return token;
};

const createToken = (user: { user_id: string; verify: UserVerifyStatus }) => {
  const data: IDataToken = {
    user_id: user.user_id,
    verify: user.verify
  };

  const token = accessToken(data);
  const rfToken = refreshToken(data);

  return { token, rfToken };
};

export { accessToken, refreshToken, createToken };
