import { checkSchema } from 'express-validator';
import userSchema from '../schemas';
import { typeUpdateMe } from '../types';
import validate from '~/utils/validate.util';
import { REGEX_USER_NAME } from '~/constants/regex';
import { USERS_MESSAGES } from '~/constants/messages';
import database from '~/databases';

const validateUpdateMe: typeUpdateMe = {
  avatar: userSchema.avatar,
  bio: userSchema.bio,
  cover_photo: userSchema.cover_photo,
  date_of_birth: { ...userSchema.date_of_birth, optional: true },
  location: userSchema.location,
  website: userSchema.website,
  name: { ...userSchema.name, optional: true, notEmpty: false },
  username: {
    ...userSchema.username,
    optional: true,
    notEmpty: false,
    custom: {
      options: async (username) => {
        if (!REGEX_USER_NAME.test(username)) {
          throw new Error(USERS_MESSAGES.USER_NAME_NOT_INVALID);
        }

        const user = await database.userMethods.findUser({ filter: { username } });
        if (user) {
          throw new Error(USERS_MESSAGES.USER_NAME_ALREADY_EXISTS);
        }

        return true;
      }
    }
  }
};

const checkValidate = checkSchema(validateUpdateMe, ['body']);
export default validate(checkValidate);
