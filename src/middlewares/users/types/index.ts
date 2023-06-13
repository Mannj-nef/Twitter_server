import { ParamSchema } from 'express-validator';

export type typeUserSchema = {
  name: ParamSchema;
  email: ParamSchema;
  password: ParamSchema;
  confirm_password: ParamSchema;
  date_of_birth: ParamSchema;
};
