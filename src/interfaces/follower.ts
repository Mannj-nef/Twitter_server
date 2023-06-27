import { ObjectId } from 'mongodb';

interface IFllower {
  _id?: ObjectId;
  user_id: ObjectId;
  followed_user_id: ObjectId;
  created_at?: Date;
}

export default IFllower;
