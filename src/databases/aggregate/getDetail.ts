import { ObjectId } from 'mongodb';
import { TweetType } from '~/enums/tweet';

const detailTweet = (tweet_id: string) => {
  return [
    {
      $match: {
        _id: new ObjectId(tweet_id)
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
                $eq: ['$$item.type', TweetType.Comment]
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
                $eq: ['$$item.type', TweetType.QuoteTweet]
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
                $eq: ['$$item.type', TweetType.Retweet]
              }
            }
          }
        }
      }
    }
  ];
};

export default detailTweet;
