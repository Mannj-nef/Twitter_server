import { ObjectId } from 'bson';

export interface ILike {
  _id?: string;
  user_id: string;
  tweet_id: string;
  created_at: Date;
}

class LikeTweetModel {
  _id?: ObjectId;
  user_id: ObjectId;
  tweet_id: ObjectId;
  created_at: Date;

  constructor(likeTweet: ILike) {
    const date = new Date();

    this._id = new ObjectId(likeTweet._id);
    this.user_id = new ObjectId(likeTweet.user_id);
    this.tweet_id = new ObjectId(likeTweet.tweet_id);
    this.created_at = likeTweet.created_at || Date;
  }
}

export default LikeTweetModel;
