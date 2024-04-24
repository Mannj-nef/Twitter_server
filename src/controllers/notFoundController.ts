import { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from '~/constants/httpStatus';
import { CustomError } from '~/models/errors';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const errorNotFound = new CustomError({
    statusCode: HTTP_STATUS.NOT_FOUND,
    message: 'url not found'
  });
  next(errorNotFound);
};
export default notFound;
