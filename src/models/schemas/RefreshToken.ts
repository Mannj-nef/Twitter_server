import { ObjectId } from 'mongodb';
import IRefreshToken from '~/interfaces/refreshToken';

class RefreshTokenModel {
  _id?: ObjectId;
  token: string;
  created_at?: Date;
  user_id: ObjectId;

  constructor({ _id, created_at, rfToken, user_id }: IRefreshToken) {
    this._id = _id;
    this.token = rfToken;
    this.created_at = created_at || new Date();
    this.user_id = user_id;
  }
}

export default RefreshTokenModel;
