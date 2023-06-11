import { Request, Response, NextFunction } from 'express';
import HTTP_STATUS from '~/constants/httpStatuss';
import { USERS_MESSAGES } from '~/constants/messages';

export const handleVerifyLogin = (rep: Request, res: Response, next: NextFunction) => {
  const { email, password } = rep.body;

  console.log({ email, password });

  if (email && !password) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: USERS_MESSAGES.PASSWORD_IS_REQUIRED });
  }
  if (!email && password) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: USERS_MESSAGES.EMAIL_IS_REQUIRED });
  }

  return next();
};
