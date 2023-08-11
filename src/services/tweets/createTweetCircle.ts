import { WithId } from 'mongodb';
import database from '~/databases';
import TweetCircleModel from '~/models/schemas/TweetCircle';

const createTweetCircle = async ({
  user_id,
  user_id_tweetCircle
}: {
  user_id: string;
  user_id_tweetCircle: string;
}) => {
  const result = await database.tweetCircleMethods.findAndUpdate({ user_id, user_id_tweetCircle });

  return result as WithId<TweetCircleModel>;
};

export default createTweetCircle;
