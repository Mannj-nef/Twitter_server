import { checkSchema } from 'express-validator';
import validate from '~/utils/validate.util';
import { typeDeteleTweet } from '../types';
import tweetSchema from '../schema';

const validateDeleteTweet: typeDeteleTweet = {
  tweet_id: tweetSchema.tweet_id
};

const checkValidate = checkSchema(validateDeleteTweet, ['params']);
export default validate(checkValidate);
