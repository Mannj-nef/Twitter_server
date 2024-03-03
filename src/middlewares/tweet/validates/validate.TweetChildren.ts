import { Request, Response, NextFunction } from 'express';
import HTTP_STATUS from '~/constants/httpStatuss';
import { TWEETS_MESSAGES } from '~/constants/messages';
import { TweetType } from '~/enums/tweet';

const tweetChildrenQueryValidation = (req: Request, res: Response, next: NextFunction) => {
  const { tweet_type, page, limit } = req.query;

  if (
    ![TweetType.Comment, TweetType.Retweet, TweetType.QuoteTweet, TweetType.Tweet].includes(
      tweet_type as TweetType
    )
  ) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: TWEETS_MESSAGES.INVALID_TWEET_TYPE
    });
  }

  next();
};

export default tweetChildrenQueryValidation;
