import { ObjectId } from 'bson';
import database from '~/databases';
import aggregate from '~/databases/aggregate';
import { TweetType } from '~/enums/tweet';
import TweetModel from '~/models/schemas/Tweet';

const getTweetChildren = async ({
  limit,
  page,
  tweet_id,
  tweet_type,
  user_id
}: {
  tweet_type: TweetType;
  tweet_id: string;
  limit: number;
  page: number;
  user_id?: string;
}) => {
  const tweets = await database.tweets
    .aggregate<TweetModel>(aggregate.getTweetChildren({ limit, page, tweet_id, tweet_type }))
    .toArray();

  const ids = tweets.map((tweet) => tweet._id as ObjectId);
  const inc = user_id ? { user_views: 1 } : { guest_views: 1 };
  const date = new Date();

  const [totalPage] = await Promise.all([
    database.tweets.countDocuments({
      parent_id: new ObjectId(tweet_id),
      type: tweet_type
    }),
    database.tweets.updateMany(
      {
        _id: {
          $in: ids
        }
      },
      {
        $inc: inc,
        $set: {
          updated_at: date
        }
      }
    )
  ]);

  tweets.forEach((tweet) => {
    tweet.updated_at = date;
    if (user_id) {
      tweet.user_views++;
    } else {
      tweet.guest_views++;
    }
  });

  return {
    tweets,
    totalPage
  };
};

export default getTweetChildren;
