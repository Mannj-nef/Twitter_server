import { ParamSchema } from 'express-validator';
import IUser from '~/interfaces/user';

/**
 customer typeuserSchema to IUser
 */
export type typeUserSchema = {
  [k in keyof Required<IUser>]: ParamSchema;
} & {
  confirm_password: ParamSchema;
  refreshToken: ParamSchema;
};

export type typeUserRegister = {
  name: ParamSchema;
  email: ParamSchema;
  password: ParamSchema;
  confirm_password: ParamSchema;
  date_of_birth: ParamSchema;
};

export type typeUserLogin = {
  email: ParamSchema;
  password: ParamSchema;
};

export type typeUserLogout = {
  refreshToken: ParamSchema;
};

export type typeUserVerifyEmailToken = {
  email_verify_token: ParamSchema;
};

export type typeUserForgotPassword = {
  email: ParamSchema;
};

export type typeUserForgotPasswordToken = {
  forgot_password_token: ParamSchema;
};

export type typeUserResetPassword = {
  forgot_password_token: ParamSchema;
  password: ParamSchema;
  confirm_password: ParamSchema;
};
