import { NextFunction, Request, Response } from 'express';
import { EntityError, CustomError } from '~/models/errors';

type ErrorsType = EntityError | CustomError;

const errorHandler = (error: ErrorsType, req: Request, res: Response, next: NextFunction) => {
  const { statusCode } = error;

  // default error
  res.status(statusCode).json({
    ...error
  });
};

export default errorHandler;
