import { ObjectId } from 'mongodb';
import { TweetAudience, TweetType } from '~/enums/tweet';
import { IMedia } from './Media';

export interface ITweet {
  _id?: ObjectId;

  user_id: ObjectId;
  parent_id: ObjectId | null;
  type: TweetType;
  audience: TweetAudience;
  content: string;

  hashtags?: ObjectId[];
  mentions?: ObjectId[];
  medias?: IMedia[];

  guest_views?: number;
  user_views?: number;

  created_at?: Date;
  updated_at?: Date;
}

class TweetModel {
  _id?: ObjectId;
  user_id: ObjectId;
  type: TweetType;
  audience: TweetAudience;
  content: string;
  parent_id: null | ObjectId;
  hashtags: ObjectId[];
  mentions: ObjectId[];
  medias: IMedia[];

  guest_views: number;
  user_views: number;
  created_at: Date;
  updated_at: Date;

  constructor(tweet: ITweet) {
    const date = new Date();

    this._id = tweet._id;

    this.user_id = tweet.user_id;
    this.parent_id = tweet.parent_id;
    this.type = tweet.type;
    this.audience = tweet.audience;
    this.content = tweet.content;

    this.hashtags = tweet.hashtags || [];
    this.mentions = tweet.mentions || [];
    this.medias = tweet.medias || [];

    this.guest_views = tweet.guest_views || 0;
    this.user_views = tweet.user_views || 0;

    this.created_at = tweet.created_at || date;
    this.updated_at = tweet.updated_at || date;
  }
}

export default TweetModel;
