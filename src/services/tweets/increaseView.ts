import { ObjectId } from 'bson';
import { WithId } from 'mongodb';
import database from '~/databases';

const increaseView = async ({ tweet_id, user_id }: { user_id?: string; tweet_id: string }) => {
  const inc = user_id ? { user_views: 1 } : { guest_views: 1 };
  const result = await database.tweets.findOneAndUpdate(
    {
      _id: new ObjectId(tweet_id)
    },
    {
      $inc: inc,
      $currentDate: {
        updated_at: true
      }
    },
    {
      returnDocument: 'after',
      projection: {
        user_views: 1,
        guest_views: 1,
        updated_at: 1
      }
    }
  );

  return result.value as WithId<{
    user_views: number;
    guest_views: number;
    updated_at: Date;
  }>;
};

export default increaseView;
