import { TweetType } from '~/enums/tweet';

export const LOOK_UP = {
  HASHTAG: {
    from: 'hashtags',
    localField: 'hashtags',
    foreignField: '_id',
    as: 'hashtags'
  },
  MENTIONS: {
    from: 'users',
    localField: 'mentions',
    foreignField: '_id',
    as: 'mentions'
  },
  TWEET_CHILD: {
    from: 'tweets',
    localField: '_id',
    foreignField: 'parent_id',
    as: 'reply'
  },
  LIKES: {
    from: 'likes',
    localField: '_id',
    foreignField: 'tweet_id',
    as: 'likes'
  },
  BOOKMARKS: {
    from: 'bookmarks',
    localField: '_id',
    foreignField: 'tweet_id',
    as: 'bookmarks'
  },
  TWEET_CIRCLES: {
    from: 'tweetCircle',
    localField: 'user_id',
    foreignField: 'user_id',
    as: 'tweetCircle'
  },
  USERS: {
    from: 'users',
    localField: 'user_id',
    foreignField: '_id',
    as: 'users'
  }
};

export const ADD_FIELDS = {
  MENTIONS: {
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
  },
  REPLY: {
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
  QUOTE: {
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
  RETWEET: {
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
};
