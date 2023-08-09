import { ObjectId } from 'mongodb';
import database from '~/databases';
import { ITweetRequestBody } from '~/interfaces/requests';
import TweetModel from '~/models/schemas/Tweet';
import hashTagService from '../hashTag';

const createTweet = async ({ user_id, tweet }: { user_id: string; tweet: ITweetRequestBody }) => {
  const { listHashtagID, lishHashtagName } = await hashTagService.findAndUpdateHashTag(
    tweet.hashtags
  );

  await database.tweetsMethods.insertTweet(
    new TweetModel({
      user_id,
      content: tweet.content,
      audience: tweet.audience,
      parent_id: tweet.parent_id,
      type: tweet.type,
      hashtags: listHashtagID,
      medias: tweet.medias,
      mentions: tweet.mentions
    })
  );

  const result: ITweetRequestBody = {
    ...tweet,
    hashtags: lishHashtagName
  };

  return result;
};

export default createTweet;
