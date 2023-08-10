import { ObjectId } from 'bson';
import database from '~/databases';

const handleCheckTweetExisted = async ({
  tweet_id,
  user_id
}: {
  user_id: string;
  tweet_id: string;
}) => {
  const tweet = await database.tweetsMethods.findTweet({
    filter: {
      _id: new ObjectId(tweet_id),
      user_id: new ObjectId(user_id)
    }
  });
  return Boolean(tweet);
};

export default handleCheckTweetExisted;
