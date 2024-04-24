import { ObjectId } from 'mongodb';
import HTTP_STATUS from '~/constants/httpStatus';
import { USERS_MESSAGES } from '~/constants/messages';
import database from '~/databases';
import { CustomError } from '~/models/errors';
import { FollowerModel } from '~/models/schemas';

interface IFollowPayload {
  followed_user_id: string;
  user_id: string;
}

const follow = async (followPayload: IFollowPayload) => {
  const idUserFollowed = new ObjectId(followPayload.followed_user_id);
  const user_id = new ObjectId(followPayload.user_id);

  const payload = {
    followed_user_id: idUserFollowed,
    user_id
  };

  const user = await database.userMethods.findUser({ filter: { _id: idUserFollowed } });

  if (!user) {
    throw new CustomError({
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: USERS_MESSAGES.USER_NOT_FOUND
    });
  }

  const follower = await database.followerMethods.fildFollower({
    filter: payload
  });

  if (!follower) {
    await database.followerMethods.insertFollow(new FollowerModel(payload));
  }

  return Boolean(follower);
};

export default follow;
