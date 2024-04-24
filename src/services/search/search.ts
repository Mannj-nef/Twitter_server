import { ObjectId } from 'mongodb';
import database from '~/databases';
import { TweetAudience } from '~/enums';

const handleSearch = async ({
  content,
  page,
  limit,
  userId
}: {
  content: string;
  page: number;
  userId: string;
  limit: number;
}) => {
  const [data, totalCount] = await Promise.all([
    await database.tweets
      .aggregate(
        [
          { $match: { $text: { $search: content } } },
          {
            $lookup: {
              from: 'users',
              localField: 'user_id',
              foreignField: '_id',
              as: 'users'
            }
          },
          { $unwind: { path: '$users' } },
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
                { audience: TweetAudience.Everyone },
                {
                  $and: [
                    { audience: TweetAudience.TwitterCircle },
                    {
                      'tweetCircle.user_id_tweetCircle': {
                        $in: [new ObjectId(userId)]
                      }
                    }
                  ]
                }
              ]
            }
          },
          {
            $lookup: {
              from: 'hashtags',
              localField: 'hashtags',
              foreignField: '_id',
              as: 'hashtags'
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'mentions',
              foreignField: '_id',
              as: 'mentions'
            }
          },
          {
            $addFields: {
              mentions: {
                $map: {
                  input: '$mentions',
                  as: 'mentions',
                  in: {
                    _id: '$$mentions._id',
                    name: '$$mentions.name',
                    email: '$$mentions.email',
                    username: '$$mentions.username',
                    avatar: '$$mentions.avatar'
                  }
                }
              }
            }
          },
          {
            $lookup: {
              from: 'bookmarks',
              localField: '_id',
              foreignField: 'tweet_id',
              as: 'bookmark'
            }
          },
          {
            $lookup: {
              from: 'likes',
              localField: '_id',
              foreignField: 'tweet_id',
              as: 'likes'
            }
          },
          {
            $lookup: {
              from: 'tweets',
              localField: '_id',
              foreignField: 'parent_id',
              as: 'reply'
            }
          },
          {
            $addFields: {
              bookmark: { $size: '$bookmark' },
              likes: { $size: '$likes' },
              reply: {
                $size: {
                  $filter: {
                    input: '$reply',
                    as: 'item',
                    cond: {
                      $eq: ['$$item.type', 'comment']
                    }
                  }
                }
              },
              quote: {
                $size: {
                  $filter: {
                    input: '$reply',
                    as: 'item',
                    cond: {
                      $eq: ['$$item.type', 'quoteTweet']
                    }
                  }
                }
              },
              retweet: {
                $size: {
                  $filter: {
                    input: '$reply',
                    as: 'item',
                    cond: {
                      $eq: ['$$item.type', 'retweet']
                    }
                  }
                }
              }
            }
          },
          {
            $project: {
              tweetCircle: 0,
              users: {
                password: 0,
                forgot_password_token: 0,
                date_of_birth: 0,
                email_verify_token: 0
              }
            }
          },
          { $skip: limit * (page - 1) },
          { $limit: limit }
        ],
        { maxTimeMS: 60000, allowDiskUse: true }
      )
      .toArray(),

    await database.tweets
      .aggregate([{ $match: { $text: { $search: content } } }, { $count: 'total' }])
      .toArray()
  ]);

  return { data, totalCount: totalCount[0].total };
};

export default handleSearch;
