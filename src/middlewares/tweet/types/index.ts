import { ParamSchema } from 'express-validator';
import { ITweetRequestBody } from '~/interfaces/requests';
import { ITweet } from '~/models/schemas/Tweet';

export type typeTweetSchema = {
  [k in keyof Required<ITweet>]: ParamSchema;
} & {
  tweet_id: ParamSchema;
};

export type typeCreateTweet = {
  [k in keyof ITweetRequestBody]: ParamSchema;
};

export type typeDeteleTweet = {
  tweet_id: ParamSchema;
};
