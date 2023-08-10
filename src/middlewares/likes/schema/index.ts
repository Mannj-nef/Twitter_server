import { ObjectId } from 'bson';
import { typeLikeSchema } from '../types';
import { TWEETS_MESSAGES } from '~/constants/messages';
import database from '~/databases';

const likeSchema: typeLikeSchema = {
  tweet_id: {
    custom: {
      options: async (tweet_id: string, { req }) => {
        const tweetId = tweet_id || (req.params?.tweet_id as string);

        if (!ObjectId.isValid(tweetId)) {
          throw new Error(TWEETS_MESSAGES.INVALID_TWEET_ID);
        }

        const tweetExisted = await database.tweetsMethods.findTweet({
          filter: { _id: new ObjectId(tweetId) }
        });

        if (!tweetExisted) {
          throw new Error(TWEETS_MESSAGES.TWEET_NOT_FOUND);
        }

        return true;
      }
    }
  },
  user_id: {},
  _id: {},
  created_at: {}
};

export default likeSchema;
