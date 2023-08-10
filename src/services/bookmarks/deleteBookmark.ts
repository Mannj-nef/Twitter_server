import database from '~/databases';

const deleteBookmark = async ({ user_id, tweet_id }: { user_id: string; tweet_id: string }) => {
  await database.bookmarkMethods.deleteBoolmark({ user_id, tweet_id });
};

export default deleteBookmark;
