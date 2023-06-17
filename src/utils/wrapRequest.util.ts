import { NextFunction, Request, RequestHandler, Response } from 'express';

const wrapRequestHandle = (functionController: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    /**
     * wrapp function controller
     * resolve => functionController(req, res, next)
     * catch => next middlewares error
     *
     * try{
     *  functionController(req, res, next)
     * } catch (error) {
     *  next(error)
     * }
     */
    Promise.resolve()
      .then(() => functionController(req, res, next))
      .catch(next);
  };
};

export default wrapRequestHandle;
