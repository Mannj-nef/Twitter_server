import TweetCircleModel from '~/models/schemas/TweetCircle';

export type tweetCircleUnion = Exclude<Partial<TweetCircleModel>, undefined>;
