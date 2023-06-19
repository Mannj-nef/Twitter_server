import { checkSchema } from 'express-validator';
import userSchema from '../schemas';
import validate from '~/utils/validate.util';
import { typeUserRegister } from '../types';
import { USERS_MESSAGES } from '~/constants/messages';
import database from '~/databases';

const validateRegister: typeUserRegister = {
  name: userSchema.name,
  email: {
    ...userSchema.email,
    custom: {
      options: async (email: string) => {
        const isExistEmail = await database.userMethods.checkExistEmail(email);
        if (isExistEmail) {
          throw new Error(USERS_MESSAGES.EMAIL_ALREADY_EXISTS);
        }
        return true;
      }
    }
  },
  password: userSchema.password,
  confirm_password: userSchema.confirm_password,
  date_of_birth: userSchema.date_of_birth
};

const checkValidate = checkSchema(validateRegister, ['body']);
export default validate(checkValidate);
