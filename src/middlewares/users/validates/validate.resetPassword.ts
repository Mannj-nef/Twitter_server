import { checkSchema } from 'express-validator';
import userSchema from '../schemas';
import { typeUserResetPassword } from '../types';
import validate from '~/utils/validate.util';

const validateResetPassword: typeUserResetPassword = {
  password: userSchema.password,
  confirm_password: userSchema.confirm_password,
  forgot_password_token: userSchema.forgot_password_token
};

const checkValidate = checkSchema(validateResetPassword, ['body']);
export default validate(checkValidate);
