import database from '~/databases';

const deleteTweet = async ({ tweet_id, user_id }: { tweet_id: string; user_id: string }) => {
  await database.tweetsMethods.deleteTweet({ tweet_id, user_id });
};

export default deleteTweet;
