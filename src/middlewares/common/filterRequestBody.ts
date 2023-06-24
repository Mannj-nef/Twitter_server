import { NextFunction, Request, Response } from 'express';
import { pick } from 'lodash';

const filterRequestBody = <T>(filterKeys: Array<keyof T>) => {
  return (req: Request, Res: Response, next: NextFunction) => {
    req.body = pick(req.body, filterKeys);

    next();
  };
};

export default filterRequestBody;
