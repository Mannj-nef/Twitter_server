import { JwtPayload } from 'jsonwebtoken';
import { TokenType } from '~/enums/token';
import { UserVerifyStatus } from '~/enums/user';

export interface IRegisterRequestBody {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  date_of_birth: string;
}

export interface ILoginRequestBody {
  email: string;
  password: string;
}

export interface ILogoutRequestBody {
  refreshToken: string;
}

export interface TokenPayload extends JwtPayload {
  user_id: string;
  verify: UserVerifyStatus;
  token_type: TokenType;
}
