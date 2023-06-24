import { Request } from 'express';
import { Jwt } from 'jsonwebtoken';
import { UserModel } from './models/schemas';
import { TokenPayload } from './interfaces/requests';

declare module 'express' {
  interface Request {
    user?: UserModel;
    decoded_token?: TokenPayload;
  }
}
