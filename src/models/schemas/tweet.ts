import { ObjectId } from 'mongodb';
import { TweetAudience, TweetType } from '~/enums/tweet';
import IMedia from '~/interfaces/media';

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

  constructor({ ...argumentSpread }: ITweet) {
    const date = new Date();

    this._id = argumentSpread._id;

    this.user_id = argumentSpread.user_id;
    this.parent_id = argumentSpread.parent_id;
    this.type = argumentSpread.type;
    this.audience = argumentSpread.audience;
    this.content = argumentSpread.content;

    this.hashtags = argumentSpread.hashtags || [];
    this.mentions = argumentSpread.mentions || [];
    this.medias = argumentSpread.medias || [];

    this.guest_views = argumentSpread.guest_views || 0;
    this.user_views = argumentSpread.user_views || 0;

    this.created_at = argumentSpread.created_at || date;
    this.updated_at = argumentSpread.updated_at || date;
  }
}

export default TweetModel;
