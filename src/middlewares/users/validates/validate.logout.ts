import { checkSchema } from 'express-validator';
import userSchema from '../schemas';
import { typeUserLogout } from '../types';
import validate from '~/utils/validate.util';

const validateLogout: typeUserLogout = {
  refreshToken: userSchema.refreshToken
};
const checkValidate = checkSchema(validateLogout, ['body']);
export default validate(checkValidate);
