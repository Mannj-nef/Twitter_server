import { WithId } from 'mongodb';
import database from '~/databases';
import LikeTweetModel from '~/models/schemas/LikeTweet';

const likeTweet = async ({ user_id, tweet_id }: { user_id: string; tweet_id: string }) => {
  const result = await database.likeMethods.findOneAndUpdate({ user_id, tweet_id });

  return result as WithId<LikeTweetModel>;
};

export default likeTweet;
