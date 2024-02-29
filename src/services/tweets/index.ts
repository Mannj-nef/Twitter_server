import handleCheckTweetCircleExisted from './checkTweetCircleExisted';
import handleCheckTweetExisted from './checkTweetExisted';
import createTweet from './createTweet';
import createTweetCircle from './createTweetCircle';
import deleteTweet from './deleteTweet';
import deleteTweetCircle from './deleteTweetCircle';
import increaseView from './increaseView';

class TweetServices {
  createTweet = createTweet;
  deleteTweet = deleteTweet;

  // circle
  createCircle = createTweetCircle;
  deleteCircle = deleteTweetCircle;

  // checkTweetExisted
  checkTweetExisted = handleCheckTweetExisted;
  checkTweetCircleExisted = handleCheckTweetCircleExisted;

  // increaseView when get tweet
  increaseView = increaseView;
}

const tweetSecvices = new TweetServices();
export default tweetSecvices;
