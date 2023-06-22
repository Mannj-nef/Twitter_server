import { checkSchema } from 'express-validator';
import userSchema from '../schemas';
import validate from '~/utils/validate.util';
import { typeUserForgotPasswordToken } from '../types';

const validateForgotPasswordToken: typeUserForgotPasswordToken = {
  // trim token
  forgot_password_token: userSchema.forgot_password_token
};

const checkValidate = checkSchema(validateForgotPasswordToken, ['body']);
export default validate(checkValidate);
