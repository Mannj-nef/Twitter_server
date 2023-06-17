import { ParamSchema } from 'express-validator';
import IUser from '~/interfaces/user';

/**
 customer typeuserSchema to IUser
 */
export type typeUserSchema = {
  [k in keyof Required<IUser>]: ParamSchema;
} & { confirm_password: ParamSchema };

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
