import { ObjectId } from 'mongodb';
import database from '~/databases';
import { UserUnion } from '~/databases/types/users';

const updateMe = async ({ _id, payload }: { _id: ObjectId; payload: UserUnion }) => {
  const _payload = payload.date_of_birth
    ? { ...payload, date_of_birth: new Date(payload.date_of_birth) }
    : payload;

  const result = await database.userMethods.updateAndReturnResult({
    _id,
    payload: {
      $set: _payload
    },
    option: {
      returnDocument: 'after',
      projection: { password: 0, email_verify_token: 0, forgot_password_token: 0 }
    }
  });

  return result;
};

export default updateMe;
