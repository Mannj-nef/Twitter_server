export interface IGetFollowingRequestBody {
  user_id: string;
}

export interface IGetFollowerRewuestBody {
  followed_user_id: string;
}

export type IFollowUserRequestBody = IGetFollowerRewuestBody;
