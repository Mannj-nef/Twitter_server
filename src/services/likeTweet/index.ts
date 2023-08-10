import likeTweet from './likeTweet';
import unLikeTweet from './unlikeTweet';

class LikeTweetService {
  likeTweet = likeTweet;
  unLikeTweet = unLikeTweet;
}

const likeTweetService = new LikeTweetService();
export default likeTweetService;
