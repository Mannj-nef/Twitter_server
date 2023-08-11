import database from '~/databases';

const deleteTweetCircle = async ({
  user_id,
  user_id_tweetCircle
}: {
  user_id: string;
  user_id_tweetCircle: string;
}) => {
  await database.tweetCircleMethods.deleteTweetCircle({ user_id, user_id_tweetCircle });
};

export default deleteTweetCircle;
