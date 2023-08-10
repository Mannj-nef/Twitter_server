import { ParamSchema } from 'express-validator';
import { ILikeRequest } from '~/interfaces/requests/like.request';
import { ILike } from '~/models/schemas/LikeTweet';

export type typeLikeSchema = {
  [k in keyof Required<ILike>]: ParamSchema;
};

export type typeCreateLikeTweet = {
  [k in keyof ILikeRequest]: ParamSchema;
};
