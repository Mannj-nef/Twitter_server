import { USERS_MESSAGES } from '~/constants/messages';
import { typeUserSchema } from '../types';
import { UserVerifyStatus } from '~/enums/user';

const userSchema: typeUserSchema = {
  // verify schema name
  name: {
    notEmpty: {
      errorMessage: USERS_MESSAGES.NAME_IS_REQUIRED
    },
    isString: {
      errorMessage: USERS_MESSAGES.NAME_MUST_BE_A_STRING
    },
    trim: true,
    isLength: {
      options: {
        min: 1,
        max: 100
      },
      errorMessage: USERS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100
    }
  },

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

  // verify refreshToken
  refreshToken: {
    trim: true
  },

  // verify email token
  email_verify_token: {
    trim: true
  },

  forgot_password_token: {},
  _id: { isObject: true },
  avatar: { isString: true },
  bio: { isString: true },
  cover_photo: { isString: true },
  location: { isString: true },
  verify: { isIn: { options: [Object.values(UserVerifyStatus)] } },
  website: { isString: true },
  username: { isString: true },
  created_at: { isDate: true },
  updated_at: { isDate: true }
};

export default userSchema;
