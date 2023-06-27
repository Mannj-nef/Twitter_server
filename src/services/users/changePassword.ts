import { ObjectId } from 'mongodb';
import database from '~/databases';
import { handleHashPassword } from '~/utils/password.util';

const changePassword = async ({ _id, password }: { _id: ObjectId; password: string }) => {
  const encryptedPassword = handleHashPassword(password);

  await database.userMethods.updateOneUser({
    _id,
    payload: { password: encryptedPassword }
  });

  return;
};

export default changePassword;
