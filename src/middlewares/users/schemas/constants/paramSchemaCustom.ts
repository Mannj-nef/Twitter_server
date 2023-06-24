import { ParamSchema } from 'express-validator';
import { USERS_MESSAGES } from '~/constants/messages';

export const urlSchema: ParamSchema = {
  isString: {
    errorMessage: USERS_MESSAGES.UPDATE_USER_SUCCESS
  },
  optional: true,
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 300
    },
    errorMessage: USERS_MESSAGES.URL_MUST_BE_LENGTH
  }
};

export const nameSchema: ParamSchema = {
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
};
