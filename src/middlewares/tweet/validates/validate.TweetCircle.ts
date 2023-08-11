import { checkSchema } from 'express-validator';
import validate from '~/utils/validate.util';
import tweetSchema from '../schema';
import { typeTweetCircle } from '../types';
import database from '~/databases';
import { ObjectId } from 'mongodb';

const validateTweetCircle: typeTweetCircle = {
  user_id_tweetCircle: {
    ...tweetSchema.user_id,
    isString: false,
    custom: {
      options: async (user_id: string, { req }) => {
        const userCircleId = user_id || (req.params?.user_id_tweetCircle as string);

        const userExisted = await database.userMethods.findUser({
          filter: {
            _id: new ObjectId(userCircleId)
          }
        });

        if (!userExisted) {
          throw new Error('user not found');
        }

        return true;
      }
    }
  }
};

const checkValidate = checkSchema(validateTweetCircle, ['body', 'headers']);
export default validate(checkValidate);
