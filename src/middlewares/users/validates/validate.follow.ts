import { checkSchema } from 'express-validator';
import userSchema from '../schemas';
import { typeFollow } from '../types';
import validate from '~/utils/validate.util';

const validateFollow: typeFollow = {
  followed_user_id: userSchema.followed_user_id
};

const checkValidate = checkSchema(validateFollow, ['body']);
export default validate(checkValidate);
