import { JwtPayload } from 'jsonwebtoken';
import { TokenType } from '~/enums/token';
import { UserVerifyStatus } from '~/enums/user';

export interface IEmailTokenRequesBody {
  email_verify_token: string;
}

export interface IForgotPasswordRequesBody {
  forgot_password_token: string;
}

export interface TokenPayload extends JwtPayload {
  user_id: string;
  verify: UserVerifyStatus;
  token_type: TokenType;
}
