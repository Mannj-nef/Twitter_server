import { ObjectId } from 'mongodb';
import database from '~/databases';

interface IUnfollowPayload {
  followed_user_id: string;
  user_id: string;
}
const unFollow = async ({ followed_user_id, user_id }: IUnfollowPayload) => {
  const payload = {
    followed_user_id: new ObjectId(followed_user_id),
    user_id: new ObjectId(user_id)
  };

  const follower = await database.followerMethods.fildFollower({ filter: payload });

  if (follower) {
    await database.followerMethods.deleteFollower({ filter: payload });
  }

  return Boolean(follower);
};

export default unFollow;
