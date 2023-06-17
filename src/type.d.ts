import { Request } from 'express';
import { UserModel } from './models/schemas';

declare module 'express' {
  interface Request {
    user?: UserModel;
  }
}
