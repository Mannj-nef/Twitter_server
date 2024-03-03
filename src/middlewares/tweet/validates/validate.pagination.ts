import { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from '~/constants/httpStatuss';

import { TWEETS_MESSAGES } from '~/constants/messages';

const validateTweetPagination = (req: Request, res: Response, next: NextFunction) => {
  const { page, limit } = req.query;

  if (page && limit) {
    if (isNaN(+page) || isNaN(+limit)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: TWEETS_MESSAGES.PAGE_AND_LIMIT_MUST_BE_NUMBER
      });
    }

    if (Number(limit) > 100 || Number(limit) < 1) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: TWEETS_MESSAGES.LIMIT_MUST_BE_FROM_1_TO_100
      });
    }

    if (Number(page) < 1) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: TWEETS_MESSAGES.PAGE_MUST_BE_FROM_1
      });
    }
  }

  next();
};

export default validateTweetPagination;
