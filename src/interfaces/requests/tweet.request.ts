import { TweetAudience, TweetType } from '~/enums/tweet';
import { IMedia } from '~/models/schemas/Media';

export interface ITweetRequestBody {
  type: TweetType;
  audience: TweetAudience;
  content: string;
  parent_id: null | string;

  hashtags: string[];
  mentions: string[];
  medias: IMedia[];
}