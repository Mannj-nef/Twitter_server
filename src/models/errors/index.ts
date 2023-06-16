import { USERS_MESSAGES } from '~/constants/messages';
import { ErrorResponse, ErrorWithStatus, ErrorsTypeValidate } from './types';
import HTTP_STATUS from '~/constants/httpStatuss';

class CustomError {
  statusCode: number;
  msg: string;
  constructor({ statusCode, message }: ErrorWithStatus) {
    this.statusCode = statusCode;
    this.msg = message;
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
