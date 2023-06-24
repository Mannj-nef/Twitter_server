import { ObjectId } from 'mongodb';
import database from '~/databases';

const getMe = async (user_id: string) => {
  const _id = new ObjectId(user_id);
  const result = await database.userMethods.findUser({
    filter: { _id },
    findOptions: {
      projection: {
        password: 0,
        email_verify_token: 0,
        forgot_password_token: 0
      }
    }
  });

  return result;
};

export default getMe;
