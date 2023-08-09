import { ObjectId } from 'mongodb';

export interface IHashTag {
  _id?: ObjectId;
  name: string;
  created_at?: Date;
}

class HashTagModel {
  _id?: ObjectId;
  name: string;
  created_at?: Date;

  constructor(hashTag: IHashTag) {
    const date = new Date();

    this._id = hashTag._id || new ObjectId();
    this.name = hashTag.name;
    this.created_at = hashTag.created_at || date;
  }
}

export default HashTagModel;
