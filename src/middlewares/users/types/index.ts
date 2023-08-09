import { ParamSchema } from 'express-validator';
import {
  IChangePasswordRequestBody,
  IEmailTokenRequesBody,
  IFollowUserRequestBody,
  IForgotPasswordRequestBody,
  IForgotPasswordTokenRequestBody,
  ILoginRequestBody,
  ILogoutRequestBody,
  IRegisterRequestBody,
  IResetPasswordRequestBody,
  IUpdateMeRequestBody
} from '~/interfaces/requests';
import { IUser } from '~/models/schemas/User';

/**
 customer typeuserSchema to IUser
 */
export type typeUserSchema = {
  [k in keyof Required<IUser>]: ParamSchema;
} & {
  confirm_password: ParamSchema;
  refreshToken: ParamSchema;
  followed_user_id: ParamSchema;
  current_password?: ParamSchema;
};

export type typeUserVerifyEmailToken = {
  [k in keyof IEmailTokenRequesBody]: ParamSchema;
};

export type typeUserForgotPassword = {
  [k in keyof IForgotPasswordRequestBody]: ParamSchema;
};

export type typeUserRegister = {
  [k in keyof IRegisterRequestBody]: ParamSchema;
};

export type typeUserLogin = {
  [k in keyof ILoginRequestBody]: ParamSchema;
};

export type typeUserLogout = {
  [k in keyof ILogoutRequestBody]: ParamSchema;
};

export type typeUserForgotPasswordToken = {
  [k in keyof IForgotPasswordTokenRequestBody]: ParamSchema;
};

export type typeUserResetPassword = {
  [k in keyof IResetPasswordRequestBody]: ParamSchema;
};

export type typeUpdateMe = {
  [k in keyof IUpdateMeRequestBody]: ParamSchema;
};

export type typeFollow = {
  [k in keyof IFollowUserRequestBody]: ParamSchema;
};

export type typeChangePassword = {
  [k in keyof IChangePasswordRequestBody]: ParamSchema;
};
