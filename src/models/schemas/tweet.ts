import { ObjectId } from 'mongodb';
import { TweetAudience, TweetType } from '~/enums/tweet';
import IMedia from '~/interfaces/media';
import ITweet from '~/interfaces/tweet';

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

  constructor({
    user_id,
    _id,
    audience,
    content,
    created_at,
    guest_views,
    hashtags,
    medias,
    mentions,
    parent_id,
    type,
    updated_at,
    user_views
  }: ITweet) {
    const date = new Date();

    this._id = _id;
    this.user_id = user_id;
    this.parent_id = parent_id;

    this.type = type;
    this.audience = audience;

    this.content = content;
    this.hashtags = hashtags;
    this.mentions = mentions;
    this.medias = medias;

    this.guest_views = guest_views || 0;
    this.user_views = user_views || 0;

    this.created_at = created_at || date;
    this.updated_at = updated_at || date;
  }
}

export default TweetModel;
