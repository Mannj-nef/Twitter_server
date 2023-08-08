import { ParamSchema } from 'express-validator';
import { TweetAudience } from '~/enums/tweet';
import { ITweetRequestBody } from '~/interfaces/requests';
import { ITweet } from '~/models/schemas/tweet';

export type typeTweetSchema = {
  [k in keyof Required<ITweet>]: ParamSchema;
};

export type typeCreateTweet = {
  [k in keyof ITweetRequestBody]: ParamSchema;
};
