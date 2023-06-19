import { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from '~/constants/httpStatuss';
import { EntityError, CustomError } from '~/models/errors';

type ErrorsType = EntityError | CustomError;

const errorHandler = (error: ErrorsType, req: Request, res: Response, next: NextFunction) => {
  const { statusCode } = error;

  // default error
  res.status(statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    ...error
  });
};

export default errorHandler;
