import dotenv from 'dotenv';
import {
  Collection,
  Db,
  Filter,
  FindOneAndUpdateOptions,
  FindOptions,
  MongoClient,
  ObjectId,
  UpdateFilter
} from 'mongodb';
import { UserModel, RefreshTokenModel, FollowerModel } from '~/models/schemas/';
import { UserUnion } from './types/users';
import { FollowerUnion } from './types/followers';
import FollowerModle from '~/models/schemas/Follower';
import TweetModel from '~/models/schemas/Tweet';
import HashTagModel from '~/models/schemas/HashTags';
import BookMarkModel from '~/models/schemas/BookMark';

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.leo8sxn.mongodb.net/?retryWrites=true&w=majority`;

class Database {
  private client: MongoClient;
  private db: Db;

  constructor() {
    this.client = new MongoClient(uri);
    this.db = this.client.db(process.env.DB_NAME);
  }

  connect = async () => {
    const db = this.db;

    try {
      await db.command({ ping: 1 });
      console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } catch (error) {
      console.dir(error);
    }
  };

  createIndexCollection = () => {
    this.userIndexs();
    this.refreshTokenIndexs();
    this.followIndexs();
    this.hashTagIndex();
    this.tweetIndex();
    this.bookmarkIndex();
  };

  // collection

  get users(): Collection<UserModel> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string);
  }

  get tweets(): Collection<TweetModel> {
    return this.db.collection(process.env.DB_TWEET_COLLECTION as string);
  }

  get bookmarks(): Collection<BookMarkModel> {
    return this.db.collection(process.env.DB_BOOKMARK_COLLECTION as string);
  }

  get likes() {
    return this.db.collection(process.env.DB_LIKE_COLLECTION as string);
  }

  get hashtag(): Collection<HashTagModel> {
    return this.db.collection(process.env.DB_HASHTAG_COLLECTION as string);
  }

  get refreshTokens(): Collection<RefreshTokenModel> {
    return this.db.collection(process.env.DB_REFRESH_TOKEN_COLLECTION as string);
  }

  get followers(): Collection<FollowerModle> {
    return this.db.collection(process.env.DB_FOLLOW_COLLECTION as string);
  }

  get medias() {
    return;
  }

  // indexs
  userIndexs = async () => {
    const existed = await this.users.indexExists(['email_1', 'username_1']);
    if (existed) return;

    this.users.createIndex({ email: 1 }, { unique: true });
    this.users.createIndex({ username: 1 }, { unique: true });
  };

  refreshTokenIndexs = async () => {
    const existed = await this.refreshTokens.indexExists(['token_1', 'exp_1']);
    if (existed) return;

    this.refreshTokens.createIndex({ token: 1 }, { unique: true });
    this.refreshTokens.createIndex({ exp: 1 }, { expireAfterSeconds: 0 });
  };

  followIndexs = async () => {
    const existed = await this.followers.indexExists([
      'user_id_1',
      'followed_user_id_1',
      'user_id_1_followed_user_id_1'
    ]);
    if (existed) return;

    this.followers.createIndex({ user_id: 1, followed_user_id: 1 });
    this.followers.createIndex({ user_id: 1 });
    this.followers.createIndex({ followed_user_id: 1 });
  };

  hashTagIndex = async () => {
    const existed = await this.hashtag.indexExists('name_1');
    if (existed) return;

    await this.hashtag.createIndex({ name: 1 });
  };

  tweetIndex = async () => {
    const existed = await this.tweets.indexExists(['user_id_1', 'user_id_1__id_1']);
    if (existed) return;

    await this.tweets.createIndex({ user_id: 1 });
    await this.tweets.createIndex({ user_id: 1, _id: 1 });
  };

  bookmarkIndex = async () => {
    const existed = await this.tweets.indexExists(['user_id_1', 'tweet_id_1']);
    if (existed) return;

    await this.bookmarks.createIndex({ user_id: 1, tweet_id: 1 });
  };

  // methods
  userMethods = {
    findUser: async ({ filter, findOptions }: { filter: UserUnion; findOptions?: FindOptions }) => {
      const user = await this.users.findOne(filter, findOptions);
      return user;
    },

    checkExistEmail: async (email: string) => {
      const user = await this.userMethods.findUser({
        filter: {
          email
        }
      });
      return Boolean(user);
    },

    insertOneUser: async (user: UserModel) => {
      const result = await this.users.insertOne(user);
      return result;
    },

    updateOneUser: async ({ _id, payload }: { _id: ObjectId; payload: UserUnion }) => {
      await this.users.updateOne({ _id }, { $set: payload, $currentDate: { updated_at: true } });
    },

    updateAndReturnResult: async ({
      _id,
      payload,
      option
    }: {
      _id: ObjectId;
      payload: UpdateFilter<UserUnion>;
      option?: FindOneAndUpdateOptions;
    }) => {
      const { value } = await this.users.findOneAndUpdate({ _id }, payload, option);
      return value;
    }
  };

  refreshTokensMethods = {
    findRfToken: async (token: string) => {
      const rfToken = await this.refreshTokens.findOne({ token });
      return rfToken;
    },

    insertRfToken: async (payload: RefreshTokenModel) => {
      const rfToken = await this.refreshTokens.insertOne(payload);
      return rfToken;
    },

    updateRfToken: async ({
      previousRfToken,
      payload
    }: {
      previousRfToken: string;
      payload: RefreshTokenModel;
    }) => {
      await this.refreshTokens.updateOne({ token: previousRfToken }, { $set: payload });
    },

    deleteRfToken: async (token: string) => {
      await this.refreshTokens.deleteOne({ token });
    }
  };

  followerMethods = {
    insertFollow: async (follower: FollowerModel) => {
      await this.followers.insertOne(follower);
    },

    fildFollower: async ({ filter, options }: { filter: FollowerUnion; options?: FindOptions }) => {
      const follower = await database.followers.findOne(filter, options);

      return follower;
    },

    fildFollowerList: async ({
      filter,
      options
    }: {
      filter: FollowerUnion;
      options?: FindOptions;
    }) => {
      const follows = await database.followers.find(filter, options).toArray();

      return follows;
    },

    deleteFollower: async ({
      filter,
      options
    }: {
      filter: FollowerUnion;
      options?: FindOptions;
    }) => {
      await database.followers.deleteOne(filter, options);
    }
  };

  tweetsMethods = {
    insertTweet: async (payload: TweetModel) => {
      await this.tweets.insertOne(payload);
    },

    findTweet: async ({ filter, option }: { filter: Filter<TweetModel>; option?: FindOptions }) => {
      const tweet = await this.tweets.findOne(filter, option);

      return tweet;
    },

    deleteTweet: async ({ tweet_id, user_id }: { tweet_id: string; user_id: string }) => {
      await this.tweets.deleteOne({
        _id: new ObjectId(tweet_id),
        user_id: new ObjectId(user_id)
      });
    }
  };

  hashTagMethods = {
    findAndUpdate: async ({ name }: { name: string }) => {
      const hashtag = await this.hashtag.findOneAndUpdate(
        { name },
        {
          $setOnInsert: new HashTagModel({ name })
        },
        {
          upsert: true,
          returnDocument: 'after'
        }
      );
      return hashtag;
    }
  };

  bookmarkMethods = {
    findOneAndUpdate: async ({ user_id, tweet_id }: { user_id: string; tweet_id: string }) => {
      const result = await this.bookmarks.findOneAndUpdate(
        { user_id: new ObjectId(user_id), tweet_id: new ObjectId(tweet_id) },
        { $setOnInsert: new BookMarkModel({ tweet_id, user_id }) },
        {
          upsert: true,
          returnDocument: 'after'
        }
      );

      return result.value;
    },

    deleteBoolmark: async ({ user_id, tweet_id }: { user_id: string; tweet_id: string }) => {
      await this.bookmarks.deleteOne({
        user_id: new ObjectId(user_id),
        tweet_id: new ObjectId(tweet_id)
      });
    }
  };
}

const database = new Database();
export default database;
