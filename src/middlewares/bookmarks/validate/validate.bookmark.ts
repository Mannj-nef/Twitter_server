import { checkSchema } from 'express-validator';
import validate from '~/utils/validate.util';
import { typeBookmarkRequest } from '../types';
import bookmarkSchema from '../schema';

const validateIdTweet: typeBookmarkRequest = {
  tweet_id: bookmarkSchema.tweet_id
};

const checkValidate = checkSchema(validateIdTweet, ['body']);
export default validate(checkValidate);
