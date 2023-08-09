import createTweet from './createTweet';

class TweetServices {
  createTweet = createTweet;
}

const tweetSecvices = new TweetServices();
export default tweetSecvices;
