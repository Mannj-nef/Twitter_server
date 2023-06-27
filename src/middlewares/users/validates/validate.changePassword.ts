import { USERS_MESSAGES } from '~/constants/messages';
import userSchema from '../schemas';
import { typeChangePassword } from '../types';
import { checkSchema } from 'express-validator';
import validate from '~/utils/validate.util';
import { UserModel } from '~/models/schemas';
import { handleVerifyPassword } from '~/utils/password.util';

const validateChangePassword: typeChangePassword = {
  password: {
    ...userSchema.password,
    custom: {
      options: (password, { req }) => {
        if (password === req.body.current_password) {
          throw new Error(USERS_MESSAGES.PASSWORD_MUST_BE_DIFFERENT_CURRENT_PASSWORD);
        }

        return true;
      }
    }
  },

  confirm_password: userSchema.confirm_password,

  current_password: {
    notEmpty: {
      errorMessage: USERS_MESSAGES.CURRENT_PASSWORD_IS_REQUIRED
    },
    trim: true,
    custom: {
      options: async (password, { req }) => {
        const user = req.user as UserModel;

        const isMatchPassword = handleVerifyPassword({ password, hash: user.password });

        if (!isMatchPassword) {
          throw new Error(USERS_MESSAGES.CURRENT_PASSWORD_NOT_MATCH);
        }

        return true;
      }
    }
  }
};

const checkValidate = checkSchema(validateChangePassword, ['body']);
export default validate(checkValidate);
