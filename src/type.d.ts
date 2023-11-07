import { Request } from 'express';
import { Jwt } from 'jsonwebtoken';
import { UserModel } from './models/schemas';
import { TokenPayload } from './interfaces/requests';
import TweetModel from './models/schemas/Tweet';

declare module 'express' {
  interface Request {
    user?: UserModel;
    tweet?: TweetModel;
    decoded_token?: TokenPayload;
  }
}
