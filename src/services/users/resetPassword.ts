import { ObjectId } from 'mongodb';
import database from '~/databases';
import { handleHashPassword } from '~/utils/password.util';

const resetPassword = async ({
  user_id,
  newPassword
}: {
  user_id: string;
  newPassword: string;
}) => {
  const _id = new ObjectId(user_id);
  await database.userMethods.updateOneUser({
    _id,
    payload: {
      password: handleHashPassword(newPassword),
      forgot_password_token: ''
    }
  });

  return;
};

export default resetPassword;
