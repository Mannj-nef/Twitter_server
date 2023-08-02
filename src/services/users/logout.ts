import database from '~/databases';

const logout = async (rfToken: string) => {
  await database.refreshTokensMethods.deleteRfToken(rfToken);
};

export default logout;
