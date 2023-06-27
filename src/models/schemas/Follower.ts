import { ObjectId } from 'mongodb';
import IFllower from '~/interfaces/follower';

class FollowerModle {
  _id?: ObjectId;
  user_id: ObjectId;
  followed_user_id: ObjectId;
  created_at?: Date;

  constructor({ _id, user_id, followed_user_id, created_at }: IFllower) {
    this._id = _id;
    this.user_id = user_id;
    this.followed_user_id = followed_user_id;
    this.created_at = created_at || new Date();
  }
}

export default FollowerModle;
