import { checkSchema } from 'express-validator';
import userSchema from '../schemas';
import validate from '~/utils/validate';
import { typeUserSchema } from '../types';

const validateRegister: typeUserSchema = {
  name: userSchema.name,
  email: userSchema.email,
  password: userSchema.password,
  confirm_password: userSchema.confirm_password,
  date_of_birth: userSchema.date_of_birth
};

const checkValidate = checkSchema(validateRegister);
export default validate(checkValidate);
