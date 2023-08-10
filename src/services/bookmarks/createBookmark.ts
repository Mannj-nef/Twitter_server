import { WithId } from 'mongodb';
import database from '~/databases';
import BookMarkModel from '~/models/schemas/BookMark';

const createBookmark = async ({ user_id, tweet_id }: { user_id: string; tweet_id: string }) => {
  const result = await database.bookmarkMethods.findOneAndUpdate({ user_id, tweet_id });

  return result as WithId<BookMarkModel>;
};

export default createBookmark;
