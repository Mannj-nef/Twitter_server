import handleCheckTweetExisted from './checkTweetExisted';
import createTweet from './createTweet';
import deleteTweet from './deleteTweet';

class TweetServices {
  createTweet = createTweet;
  deleteTweet = deleteTweet;

  checkTweetExisted = handleCheckTweetExisted;
}

const tweetSecvices = new TweetServices();
export default tweetSecvices;
