import { ObjectId } from 'mongodb';
import IMedia from './media';
import { TweetAudience, TweetType } from '~/enums/tweet';

interface ITweet {
  _id?: ObjectId;
  user_id: ObjectId;
  parent_id: ObjectId | null;

  type: TweetType;
  audience: TweetAudience;
  content: string;

  hashtags: ObjectId[];
  mentions: ObjectId[];
  medias: IMedia[];

  guest_views?: number;
  user_views?: number;
  created_at?: Date;
  updated_at?: Date;
}

export default ITweet;
