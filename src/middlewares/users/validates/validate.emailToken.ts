import validate from '~/utils/validate.util';
import userSchema from '../schemas';
import { typeUserVerifyEmailToken } from '../types';
import { checkSchema } from 'express-validator';

const validateEmailToken: typeUserVerifyEmailToken = {
  // trim token
  email_verify_token: userSchema.email_verify_token
};

const checkEmailToken = checkSchema(validateEmailToken, ['body']);
export default validate(checkEmailToken);
