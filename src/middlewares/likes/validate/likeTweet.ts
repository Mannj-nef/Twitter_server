import { checkSchema } from 'express-validator';
import validate from '~/utils/validate.util';
import { typeCreateLikeTweet } from '../types';
import likeSchema from '../schema';

const validateLikeTweet: typeCreateLikeTweet = {
  tweet_id: likeSchema.tweet_id
};

const checkValidate = checkSchema(validateLikeTweet, ['body', 'params']);
export default validate(checkValidate);
