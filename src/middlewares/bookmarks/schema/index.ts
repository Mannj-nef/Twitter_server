import database from '~/databases';
import { typebookmarkSchema } from '../types';
import { ObjectId } from 'bson';
import { TWEETS_MESSAGES } from '~/constants/messages';

const bookmarkSchema: typebookmarkSchema = {
  tweet_id: {
    trim: true,
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

export default bookmarkSchema;
