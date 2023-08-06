import { ObjectId } from 'mongodb';
import database from '~/databases';

const following = async (userId: string) => {
  const follows = await database.followerMethods.fildFollowerList({
    filter: { user_id: new ObjectId(userId) },
    options: {
      projection: { created_at: 0 }
    }
  });

  return follows;
};

export default following;
