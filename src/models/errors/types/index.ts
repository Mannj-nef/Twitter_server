import { ValidationError } from 'express-validator';

export type ErrorsTypeValidate = Record<string, ValidationError>;

export type ErrorWithStatus = { message: string; statusCode: number; path?: string };

export type ErrorResponse = {
  errorObject: ErrorsTypeValidate;
};
