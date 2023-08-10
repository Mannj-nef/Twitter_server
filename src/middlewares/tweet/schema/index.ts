import { TweetAudience, TweetType } from '~/enums/tweet';
import { typeTweetSchema } from '../types';
import { TWEETS_MESSAGES } from '~/constants/messages';
import { ObjectId } from 'mongodb';
import { IMedia } from '~/models/schemas/Media';
import { MediaType } from '~/enums/media';
import database from '~/databases';

const tweetSchema: typeTweetSchema = {
  // verify schema audience
  audience: {
    isEmpty: false,
    isString: {
      errorMessage: TWEETS_MESSAGES.AUDIENCE_MUST_BE_STRING
    },
    isIn: {
      options: [Object.values(TweetAudience)],
      errorMessage: TWEETS_MESSAGES.AUDIENCE_MUST_BE_INVALID
    }
  },

  //   verify schema content
  content: {
    trim: true,
    isString: {
      errorMessage: TWEETS_MESSAGES.CONTENT_MUST_BE_STRING
    },
    isLength: {
      options: {
        min: 1,
        max: 300
      },
      errorMessage: TWEETS_MESSAGES.CONTENT_LENGTH_MUST_BE_FROM_1_TO_300
    }
  },

  //   verify schema type
  type: {
    isEmpty: false,
    isString: {
      errorMessage: TWEETS_MESSAGES.TYPE_MUST_BE_STRING
    },
    isIn: {
      options: [Object.values(TweetType)],
      errorMessage: TWEETS_MESSAGES.TYPE_MUST_BE_INVALID
    }
  },

  //   verify schema hashtags
  hashtags: {
    isArray: {
      errorMessage: TWEETS_MESSAGES.HASHTAGS_MUST_BE_AN_ARRAY_OF_STRING
    },
    custom: {
      options: (hashtags: string[]) => {
        if (hashtags.some((item) => typeof item !== 'string')) {
          throw Error(TWEETS_MESSAGES.HASHTAGS_MUST_BE_AN_ARRAY_OF_STRING);
        }
        return true;
      }
    }
  },

  mentions: {
    isArray: {
      errorMessage: TWEETS_MESSAGES.HASHTAGS_MUST_BE_AN_ARRAY_OF_STRING
    },
    custom: {
      options: (mentions: string[]) => {
        if (mentions.some((item) => !ObjectId.isValid(item))) {
          throw Error(TWEETS_MESSAGES.MENTIONS_MUST_BE_AN_ARRAY_OF_USER_ID);
        }
        return true;
      }
    }
  },

  //   verify schema parent_id
  parent_id: {
    custom: {
      options: (value, { req }) => {
        const type = req.body.type;

        if (type === TweetType.Tweet && value !== null) {
          throw new Error(TWEETS_MESSAGES.PARENT_ID_MUST_BE_NULL);
        }

        if (
          [TweetType.Retweet, TweetType.QuoteTweet, TweetType.Comment].includes(type) &&
          !ObjectId.isValid(value)
        ) {
          throw new Error(TWEETS_MESSAGES.PARENT_ID_MUST_BE_A_VALID_TWEET_ID);
        }

        return true;
      }
    }
  },

  //   verify schema media
  medias: {
    custom: {
      options: (values: IMedia[]) => {
        //  [{"url": "asdasd", "type": "image"}]
        const isValid = values.every(
          (item) =>
            typeof item.url === 'string' && [MediaType.Image, MediaType.Video].includes(item.type)
        );

        if (!isValid) {
          throw new Error(TWEETS_MESSAGES.MEDIAS_MUST_BE_AN_ARRAY_OF_MEDIA_OBJECT);
        }

        return true;
      }
    }
  },

  //   verify schema userId
  user_id: {
    isString: {
      errorMessage: TWEETS_MESSAGES.USER_ID_MUST_BE_IS_STRING
    },
    trim: true,
    custom: {
      options: (UserId) => {
        if (!ObjectId.isValid(UserId)) {
          throw new Error(TWEETS_MESSAGES.USER_ID_MUST_BE_INVALID);
        }
        return true;
      }
    }
  },

  tweet_id: {
    custom: {
      options: async (v, { req }) => {
        const tweetId = req.params?.tweet_id as string;

        if (!ObjectId.isValid(tweetId)) {
          throw new Error(TWEETS_MESSAGES.INVALID_TWEET_ID);
        }

        const tweetExisted = await database.tweetsMethods.findTweet({
          filter: {
            _id: new ObjectId(tweetId)
          }
        });

        if (!tweetExisted) {
          throw new Error(TWEETS_MESSAGES.TWEET_NOT_FOUND);
        }
        return true;
      }
    }
  },

  _id: {},
  guest_views: {},
  user_views: {},

  created_at: {},
  updated_at: {}
};

export default tweetSchema;
