import { ObjectId } from 'mongodb';
import { UserVerifyStatus } from '~/enums/user';

interface IUser {
  _id?: ObjectId;
  name?: string;
  email: string;
  date_of_birth?: Date;
  password: string;
  created_at?: Date;
  updated_at?: Date;
  email_verify_token?: string;
  forgot_password_token?: string;
  verify?: UserVerifyStatus;

  bio?: string;
  location?: string;
  website?: string;
  username?: string;
  avatar?: string;
  cover_photo?: string;
}

export default IUser;
