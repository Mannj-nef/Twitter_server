import { USERS_MESSAGES } from '~/constants/messages';
import { ErrorResponse, ErrorWithStatus, ErrorsTypeValidate } from './types';
import HTTP_STATUS from '~/constants/httpStatus';

class CustomError extends Error {
  statusCode: number;
  msg: string;
  path?: string;

  constructor({ statusCode, message, path }: ErrorWithStatus) {
    super();
    this.statusCode = statusCode;
    this.msg = message;
    this.path = path;
  }
}

class EntityError extends CustomError {
  error: ErrorsTypeValidate;

  constructor({ errorObject }: ErrorResponse) {
    const message = USERS_MESSAGES.VALIDATION_ERROR;
    const statusCode = HTTP_STATUS.UNPROCESSABLE_ENTITY;

    super({ message, statusCode });
    this.error = errorObject;
  }
}

export { EntityError, CustomError };
