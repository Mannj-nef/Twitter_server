import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema';

// sequential processing, stops running validations chain if the previous one fails.
const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  const handle = async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req);
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.mapped() });
  };

  return handle;
};

export default validate;
