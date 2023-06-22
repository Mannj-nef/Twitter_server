import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UserVerifyStatus } from '~/enums/user';
import { CustomError } from '~/models/errors';
import { capitalize } from 'lodash';
import { TokenType } from '~/enums/token';
import { TokenPayload } from '~/interfaces/requests';

dotenv.config();

interface IDataToken {
  user_id: string;
  token_type?: TokenType;
  verify: UserVerifyStatus;
}

// sign access token
const signAccessToken = (payload: IDataToken) => {
  const accessTokenData: IDataToken = {
    ...payload,
    token_type: TokenType.AccessToken
  };

  const token = jwt.sign(accessTokenData, process.env.JWT_ACCESS_TOKEN as string, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
  });

  return token;
};

// sign refresh token
const signRefreshToken = (payload: IDataToken) => {
  const rfTokenData: IDataToken = {
    ...payload,
    token_type: TokenType.RefreshToken
  };

  const token = jwt.sign(rfTokenData, process.env.JWT_REFRESH_TOKEN as string, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
  });

  return token;
};

// sign email token
const signEmailToken = (payload: IDataToken) => {
  const emailToken: IDataToken = {
    ...payload,
    token_type: TokenType.EmailVerifyToken
  };

  const token = jwt.sign(emailToken, process.env.JWT_EMAIL_VERIFY_TOKEN as string, {
    expiresIn: process.env.JWT_EMAIL_VERIFY_TOKEN_EXPIRES_IN
  });

  return token;
};

// sign forgot password token
const signForgotPassToken = (payload: IDataToken) => {
  const forgotPasswordToken = {
    ...payload,
    TokenType: TokenType.ForgotPasswordToken
  };

  const token = jwt.sign(forgotPasswordToken, process.env.JWT_FORGOT_PASSWORD_TOKEN as string, {
    expiresIn: process.env.JWT_FORGOT_PASSWORD_EXPIRES_IN
  });

  return token;
};

// verify token
const verifyToken = ({ token, secretKey }: { token: string; secretKey: string }) => {
  try {
    const decoded = jwt.verify(token, secretKey);

    return decoded as TokenPayload;
  } catch (error) {
    const { message } = error as Error;

    throw new CustomError({ statusCode: 403, message: capitalize(message) });
  }
};

// ceate token
const createToken = ({ user_id, verify }: IDataToken) => {
  const data: IDataToken = {
    user_id,
    verify
  };

  const token = signAccessToken(data);
  const rfToken = signRefreshToken(data);

  return { token, rfToken };
};

export { verifyToken, signEmailToken, signForgotPassToken };
export default createToken;
