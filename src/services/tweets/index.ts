import handleCheckTweetCircleExisted from './checkTweetCircleExisted';
import handleCheckTweetExisted from './checkTweetExisted';
import createTweet from './createTweet';
import createTweetCircle from './createTweetCircle';
import deleteTweet from './deleteTweet';
import deleteTweetCircle from './deleteTweetCircle';
import getTweetChildren from './getTweetChildren';
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

  getChildren = getTweetChildren;
}

const tweetServices = new TweetServices();
export default tweetServices;
