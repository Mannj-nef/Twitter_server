import detailTweet, { tweetChildren } from './getDetail';
import { getNewTweets } from './tweet';

const aggregate = {
  getNewTweets: getNewTweets,
  getTweetDetail: detailTweet,
  getTweetChildren: tweetChildren
};

export default aggregate;
