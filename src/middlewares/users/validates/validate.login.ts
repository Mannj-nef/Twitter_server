import { checkSchema } from 'express-validator';
import userSchema from '../schemas';
import validate from '~/utils/validate.util';
import database from '~/databases';
import { USERS_MESSAGES } from '~/constants/messages';
import { typeUserLogin } from '../types';
import { handleVerifyPassword } from '~/utils/password.util';

const validateLogin: typeUserLogin = {
  email: {
    ...userSchema.email,
    custom: {
      options: async (email: string, { req }) => {
        const emailUser = email.toLowerCase().trim();
        const user = await database.userMethods.findUserByEmail({ email: emailUser });

        const passwordExactly = handleVerifyPassword({
          password: req.body.password,
          hash: user?.password
        });

        if (!user || !passwordExactly) {
          throw new Error(USERS_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT);
        }

        req.user = user;

        return true;
      }
    }
  },
  password: userSchema.password
};

const checkValidate = checkSchema(validateLogin, ['body']);
export default validate(checkValidate);
