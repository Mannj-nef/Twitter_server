import follow from './followUser';

class FollowService {
  follow = follow.follow;
  followers = follow.followers;
  following = follow.following;
  unfollow = follow.unFollow;
}

const followService = new FollowService();
export default followService;
