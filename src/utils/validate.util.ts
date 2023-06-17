import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema';
import { EntityError } from '~/models/errors';

// sequential processing, stops running validations chain if the previous one fails.
// validate error entity 422
const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  const handle = async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req);
    const errors = validationResult(req);

    // not erros
    if (errors.isEmpty()) {
      return next();
    }

    // has error ENTITY 422
    const errorsObject = {
      errorObject: errors.mapped()
    };
    const errorEntity = new EntityError(errorsObject);

    next(errorEntity);
  };

  return handle;
};

export default validate;
