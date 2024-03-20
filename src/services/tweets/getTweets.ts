import { ObjectId } from 'bson';
import database from '~/databases';
import aggregate from '~/databases/aggregate';
import TweetModel from '~/models/schemas/Tweet';

const handleGetTweets = async ({
  limit,
  page,
  user_id
}: {
  user_id: string;
  limit: number;
  page: number;
}) => {
  const userFollowed = await database.followers
    .find({
      user_id: new ObjectId(user_id)
    })
    .toArray();

  const ids = userFollowed.map((user) => user.followed_user_id as ObjectId);
  ids.push(new ObjectId(user_id));

  const tweets = await database.tweets
    .aggregate<TweetModel[]>(
      aggregate.getNewTweets({
        ids,
        limit,
        page
      })
    )
    .toArray();

  /**
   * miss total page required
   * miss plus view when get tweet
   */

  return tweets;
};

export default handleGetTweets;
