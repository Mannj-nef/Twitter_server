const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',

  // name
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 1 to 100',

  // email
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'Email already verified before',
  EMAIL_VERIFY_SUCCESS: 'Email verify success',
  EMAIL_OR_PASSWORD_NOT_EXIST: 'Email or password does not exist',

  // password
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Password length must be from 6 to 50',
  PASSWORD_MUST_BE_STRONG:
    'Password must be 6-50 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  RESET_PASSWORD_SUCCESS: 'Rest password success',

  // confirm password
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Confirm password length must be from 6 to 50',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be 6-50 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',

  // date
  DATE_OF_BIRTH_MUST_BE_ISO8601: 'Date of birth must be ISO8601',

  // success
  LOGIN_SUCCESS: 'Login success',
  REGISTER_SUCCESS: 'Register success',
  LOGOUT_SUCCESS: 'Logout success',
  RESED_EMAIL_SUCCESS: 'Resend email success, please check your email',
  FORGOT_PASSWORD_TOKEN_SUCCESS: 'Resend forgot password success, please check your email',
  VERIFY_EMAIL_TOKEN_SUCCESS: 'Verify email token success',
  GET_USER_SUCCESS: 'Get user success',
  UPDATE_USER_SUCCESS: 'Update user success',

  // token
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  USED_REFRESH_TOKEN_OR_NOT_EXIST: 'Used refresh token or not exist',
  TOKEN_INVALID_FORMAT: 'Invalid token format',
  EMAIL_VERIFY_TOKEN_INVALID: 'Email verify token is invalid',
  FORGOT_PASSWORD_TOKEN_INVALID: 'Forgot password token is invalid',
  FORGOT_PASSWORD_TOKEN_REQUIRED: 'Forgot password token required',
  VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS: 'Verify forgot password success',

  // not found
  USER_NOT_FOUND: 'User not found',

  // user
  USER_NOT_VERIFIED: 'User not verified',
  USER_NAME_NOT_INVALID:
    'Username cannot contain consecutive periods, no trailing period, begins with alphanumeric characters or underscores, May contain alphanumeric characters, underscores and periods Word length 4 up to 15 characters',
  USER_NAME_ALREADY_EXISTS: 'Username already exists',

  // bio
  BIO_MUST_BE_STRING: 'Biography must be a string',
  BIO_MUST_BE_LENGTH: 'Biography length must be from 1 to 100',

  // lovation
  LOCATION_MUST_BE_STRING: 'Location must be a string',
  LOCATION_MUST_BE_LENGTH: 'Location length must be from 1 to 100',

  // url
  URL_MUST_BE_STRING: 'URL must be is string',
  URL_MUST_BE_LENGTH: 'URL length must be from 1 to 300'
} as const;

export default USERS_MESSAGES;
