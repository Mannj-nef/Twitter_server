import { ObjectId } from 'mongodb';

interface IRefreshToken {
  _id?: ObjectId;
  rfToken: string;
  created_at?: Date;
  user_id: ObjectId;
  iat: number;
  exp: number;
}

export default IRefreshToken;
