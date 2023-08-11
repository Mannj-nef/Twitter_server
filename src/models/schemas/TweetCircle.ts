import { ObjectId } from 'mongodb';

export interface ITweetCircle {
  _id?: string;
  user_id: string;
  user_id_tweetCircle: string;
  created_at?: Date;
}

class TweetCircleModel {
  _id: ObjectId;
  user_id: ObjectId;
  user_id_tweetCircle: ObjectId;
  created_at: Date;

  constructor(tweetCircle: ITweetCircle) {
    const date = new Date();

    this._id = new ObjectId(tweetCircle._id);
    this.user_id = new ObjectId(tweetCircle.user_id);
    this.user_id_tweetCircle = new ObjectId(tweetCircle.user_id_tweetCircle);
    this.created_at = tweetCircle.created_at || date;
  }
}

export default TweetCircleModel;
