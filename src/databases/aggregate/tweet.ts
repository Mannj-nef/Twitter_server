import { ObjectId } from 'bson';
import { ADD_FIELDS, LOOK_UP } from '~/constants/aggregate/tweet';
import { TweetAudience } from '~/enums';

export const getNewTweets = ({
  ids,
  limit,
  page
}: {
  ids: ObjectId[];
  page: number;
  limit: number;
}) => {
  return [
    {
      $match: {
        user_id: {
          $in: ids
        }
      }
    },
    {
      $lookup: LOOK_UP.USERS
    },
    {
      $unwind: {
        path: '$users'
      }
    },
    {
      $lookup: LOOK_UP.TWEET_CIRCLES
    },
    {
      $match: {
        $or: [
          {
            audience: TweetAudience.Everyone
          },
          {
            $and: [
              {
                audience: TweetAudience.TwitterCircle
              },
              {
                'tweetCircle.user_id_tweetCircle': {
                  $in: ids
                }
              }
            ]
          }
        ]
      }
    },
    {
      $lookup: LOOK_UP.HASHTAG
    },
    {
      $lookup: LOOK_UP.MENTIONS
    },
    {
      $addFields: {
        mentions: ADD_FIELDS.MENTIONS
      }
    },
    {
      $lookup: LOOK_UP.BOOKMARKS
    },
    {
      $lookup: LOOK_UP.LIKES
    },
    {
      $lookup: LOOK_UP.TWEET_CHILD
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
    {
      $addFields: {
        bookmark: { $size: '$bookmarks' },
        likes: { $size: '$likes' },
        reply: ADD_FIELDS.REPLY,
        quote: ADD_FIELDS.QUOTE,
        retweet: ADD_FIELDS.RETWEET
      }
    },
    {
      $skip: (page - 1) * limit
    },
    {
      $limit: limit
    }
  ];
};
