import database from '~/databases';

const getProfile = async (username: string) => {
  const user = await database.userMethods.findUser({
    filter: { username },
    findOptions: {
      projection: {
        password: 0,
        created_at: 0,
        updated_at: 0,
        email_verify_token: 0,
        forgot_password_token: 0,
        verify: 0
      }
    }
  });

  return user;
};

export default getProfile;
