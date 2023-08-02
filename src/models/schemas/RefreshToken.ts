import { ObjectId } from 'mongodb';
import IRefreshToken from '~/interfaces/refreshToken';

class RefreshTokenModel {
  _id?: ObjectId;
  token: string;
  created_at?: Date;
  user_id: ObjectId;
  iat: Date;
  exp: Date;

  constructor({ _id, created_at, rfToken, user_id, iat, exp }: IRefreshToken) {
    this._id = _id;
    this.token = rfToken;
    this.created_at = created_at || new Date();
    this.user_id = user_id;
    this.iat = new Date(iat * 1000);
    this.exp = new Date(exp * 1000);
  }
}

export default RefreshTokenModel;
