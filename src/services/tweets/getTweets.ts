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

  const [tweets, totalCount] = await Promise.all([
    await database.tweets
      .aggregate<TweetModel>(
        aggregate.getNewTweets({
          ids,
          limit,
          page
        })
      )
      .toArray(),

    await database.tweets
      .aggregate([
        {
          $match: {
            user_id: {
              $in: ids
            }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'users'
          }
        },
        {
          $unwind: {
            path: '$users'
          }
        },
        {
          $lookup: {
            from: 'tweetCircle',
            localField: 'user_id',
            foreignField: 'user_id',
            as: 'tweetCircle'
          }
        },
        {
          $match: {
            $or: [
              {
                audience: 'everyone'
              },
              {
                $and: [
                  {
                    audience: 'circle'
                  },
                  {
                    'tweetCircle.user_id_tweetCircle': {
                      $in: [user_id]
                    }
                  }
                ]
              }
            ]
          }
        },
        {
          $count: 'total'
        }
      ])
      .toArray()
  ]);

  const tweetIds = tweets.map((tweet) => tweet._id as ObjectId);
  await database.tweets.updateMany(
    {
      _id: { $in: tweetIds }
    },
    {
      $inc: { user_views: 1 },
      $set: { updated_at: new Date() }
    }
  );
  tweets.forEach((tweet) => {
    tweet.user_views++;
  });

  return { tweets, totalCount: totalCount[0].total };
};

export default handleGetTweets;
