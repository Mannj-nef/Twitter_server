import { USERS_MESSAGES } from '~/constants/messages';
import { typeUserSchema } from '../types';
import { UserVerifyStatus } from '~/enums/user';
import { nameSchema, urlSchema } from './constants/paramSchemaCustom';
import { ObjectId } from 'mongodb';

const userSchema: typeUserSchema = {
  // verify schema email
  email: {
    isEmail: { errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID },
    notEmpty: { errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED },
    trim: true
  },

  // verify schema password
  password: {
    notEmpty: { errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED },
    trim: true,
    isLength: {
      options: {
        min: 6,
        max: 50
      },
      errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
    },
    isStrongPassword: {
      options: {
        minLength: 6,
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 1
      },
      errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRONG
    }
  },

  // verify confirm password
  confirm_password: {
    notEmpty: {
      errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_IS_REQUIRED
    },
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error(USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD);
        }
        return true;
      }
    }
  },

  // verify date_of_birth
  date_of_birth: {
    isISO8601: {
      options: {
        strict: true,
        strictSeparator: true
      },
      errorMessage: USERS_MESSAGES.DATE_OF_BIRTH_MUST_BE_ISO8601
    }
  },

  // verify refreshToken trim token
  refreshToken: {
    trim: true
  },

  // verify email token
  email_verify_token: {
    trim: true,
    notEmpty: {
      errorMessage: USERS_MESSAGES.EMAIL_VERIFY_TOKEN_IS_REQUIRED
    }
  },

  // forgot password token
  forgot_password_token: {
    trim: true,
    notEmpty: {
      errorMessage: USERS_MESSAGES.FORGOT_PASSWORD_TOKEN_REQUIRED
    }
  },

  // verify schema name
  name: nameSchema,
  username: nameSchema,

  avatar: urlSchema,
  cover_photo: urlSchema,
  website: urlSchema,

  //  verify biography
  bio: {
    optional: true,
    isString: {
      errorMessage: USERS_MESSAGES.BIO_MUST_BE_STRING
    },
    trim: true,
    isLength: {
      options: {
        min: 1,
        max: 100
      },
      errorMessage: USERS_MESSAGES.BIO_MUST_BE_LENGTH
    }
  },

  //  verify location
  location: {
    optional: true,
    isString: {
      errorMessage: USERS_MESSAGES.LOCATION_MUST_BE_STRING
    },
    trim: true,
    isLength: {
      options: {
        min: 1,
        max: 100
      },
      errorMessage: USERS_MESSAGES.LOCATION_MUST_BE_LENGTH
    }
  },

  // follower user id
  followed_user_id: {
    custom: {
      options: (value: string, { req }) => {
        const user_id = (req.params?.followed_user_id as string) || value;

        if (!ObjectId.isValid(user_id)) {
          throw new Error(USERS_MESSAGES.USER_ID_INVALID);
        }

        return true;
      }
    }
  },

  //
  verify: { isIn: { options: Object.values(UserVerifyStatus) } },
  created_at: { isDate: true },
  updated_at: { isDate: true },
  _id: { isObject: true }
};

export default userSchema;
