import { ObjectId } from 'mongodb';
import { ADD_FIELDS, LOOK_UP } from '~/constants/aggregate/tweet';
import { TweetType } from '~/enums/tweet';

const detailTweet = (tweet_id: string) => {
  return [
    {
      $match: {
        _id: new ObjectId(tweet_id)
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
      $addFields: {
        bookmark: { $size: '$bookmarks' },
        likes: { $size: '$likes' },
        reply: ADD_FIELDS.REPLY,
        quote: ADD_FIELDS.QUOTE,
        retweet: ADD_FIELDS.RETWEET
      }
    }
  ];
};

export const tweetChildren = ({
  tweet_type,
  tweet_id,
  limit,
  page
}: {
  tweet_type: TweetType;
  tweet_id: string;
  page: number;
  limit: number;
}) => {
  return [
    {
      $match: {
        parent_id: new ObjectId(tweet_id),
        type: tweet_type
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

export default detailTweet;
