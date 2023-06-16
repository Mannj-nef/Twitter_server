import { NextFunction, Request, RequestHandler, Response } from 'express';

const wrapRequestHandle = (functionController: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    /**
     *
     */

    Promise.resolve()
      .then(() => functionController(req, res, next))
      .catch(next);
  };
};

export default wrapRequestHandle;
