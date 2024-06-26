import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from '~/constants/httpStatus';
import { TWEETS_MESSAGES, USERS_MESSAGES } from '~/constants/messages';
import database from '~/databases';
import { TweetAudience } from '~/enums/tweet';
import { UserVerifyStatus } from '~/enums/user';
import { TokenPayload } from '~/interfaces/requests';
import { CustomError } from '~/models/errors';
import aggregate from '~/databases/aggregate';
import TweetModel from '~/models/schemas/Tweet';

const audienceValidator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id } = req.decoded_token as TokenPayload;

    if (!ObjectId.isValid(req.params.tweet_id)) {
      throw new CustomError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: TWEETS_MESSAGES.INVALID_TWEET_ID
      });
    }

    const [tweet] = await database.tweets
      .aggregate<TweetModel>(aggregate.getTweetDetail(req.params.tweet_id))
      .toArray();

    if (!tweet) {
      throw new CustomError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: TWEETS_MESSAGES.TWEET_NOT_FOUND
      });
    }

    const author = await database.userMethods.findUser({
      filter: {
        _id: new ObjectId(tweet.user_id)
      }
    });

    if (author?.verify === UserVerifyStatus.Banned) {
      throw new CustomError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: USERS_MESSAGES.USER_NOT_FOUND
      });
    }

    if (tweet.audience === TweetAudience.TwitterCircle) {
      const listIdUserInTweetCircle = await database.tweetCircleMethods.findTweetCircle({
        filter: {
          user_id: tweet.user_id
        }
      });

      if (!listIdUserInTweetCircle) {
        throw new CustomError({
          statusCode: HTTP_STATUS.FORBIDDEN,
          message: USERS_MESSAGES.USER_DO_NOT_HAVE_ACCESS
        });
      }

      const isUserInCircle = listIdUserInTweetCircle.some((user) =>
        user.user_id_tweetCircle.equals(user_id)
      );

      if (!isUserInCircle && !tweet.user_id.equals(user_id)) {
        throw new CustomError({
          message: USERS_MESSAGES.USER_DO_NOT_HAVE_ACCESS,
          statusCode: HTTP_STATUS.FORBIDDEN
        });
      }
    }

    req.tweet = tweet;
    next();
  } catch (error) {
    next(error);
  }
};

export default audienceValidator;
