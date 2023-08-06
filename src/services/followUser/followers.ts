import { ObjectId } from 'mongodb';
import database from '~/databases';

const followers = async (followed_user_id: string) => {
  const follows = await database.followerMethods.fildFollowerList({
    filter: { followed_user_id: new ObjectId(followed_user_id) },
    options: {
      projection: { created_at: 0 }
    }
  });

  return follows;
};

export default followers;
