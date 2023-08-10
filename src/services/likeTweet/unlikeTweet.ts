import database from '~/databases';

const unLikeTweet = async ({ user_id, tweet_id }: { user_id: string; tweet_id: string }) => {
  await database.likeMethods.unLikeTweet({ tweet_id, user_id });

  return;
};

export default unLikeTweet;
