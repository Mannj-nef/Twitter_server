import handleCheckTweetCircleExisted from './checkTweetCircleExisted';
import handleCheckTweetExisted from './checkTweetExisted';
import createTweet from './createTweet';
import createTweetCircle from './createTweetCircle';
import deleteTweet from './deleteTweet';
import deleteTweetCircle from './deleteTweetCircle';

class TweetServices {
  createTweet = createTweet;
  deleteTweet = deleteTweet;

  // circle
  createCircle = createTweetCircle;
  deleteCircle = deleteTweetCircle;

  // checkTweetExisted
  checkTweetExisted = handleCheckTweetExisted;
  checkTweetCircleExisted = handleCheckTweetCircleExisted;
}

const tweetSecvices = new TweetServices();
export default tweetSecvices;
