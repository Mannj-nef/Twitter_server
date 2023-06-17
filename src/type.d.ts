import { Request } from 'express';
import UserModel from './models/schemas/User';

declare module 'express' {
  interface Request {
    user?: UserModel;
  }
}
