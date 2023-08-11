import database from '~/databases';

const handleCheckTweetCircleExisted = async ({
  user_id_tweetCircle,
  user_id
}: {
  user_id: string;
  user_id_tweetCircle: string;
}) => {
  const tweet = await database.tweetCircleMethods.findTweetCircle({
    user_id,
    user_id_tweetCircle
  });

  return Boolean(tweet);
};

export default handleCheckTweetCircleExisted;
