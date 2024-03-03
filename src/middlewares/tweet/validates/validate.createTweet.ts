import { checkSchema } from 'express-validator';
import validate from '~/utils/validate.util';
import { typeCreateTweet } from '../types';
import tweetSchema from '../schema';

const validateCreateTweet: typeCreateTweet = {
  audience: tweetSchema.audience,
  content: tweetSchema.content,
  parent_id: tweetSchema.parent_id,
  type: tweetSchema.type,
  hashtags: tweetSchema.hashtags,
  medias: tweetSchema.medias,
  mentions: tweetSchema.mentions
};

const checkValidate = checkSchema(validateCreateTweet, ['body']);
export default validate(checkValidate);
