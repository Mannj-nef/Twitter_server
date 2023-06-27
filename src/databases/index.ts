import dotenv from 'dotenv';
import {
  Collection,
  Db,
  FindOneAndUpdateOptions,
  FindOptions,
  MongoClient,
  ObjectId,
  UpdateFilter
} from 'mongodb';
import { UserModel, RefreshTokenModel, FollowerModel } from '~/models/schemas/';
import { UserUnion } from './types/users';
import { FollowerUnion } from './types/followers';

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

  get users(): Collection<UserModel> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string);
  }

  get tweets() {
    return;
  }

  get bookmarks() {
    return;
  }

  get likes() {
    return;
  }

  get hashtag() {
    return;
  }

  get refreshTokens(): Collection<RefreshTokenModel> {
    return this.db.collection(process.env.DB_REFRESH_TOKEN_COLLECTION as string);
  }

  get followers() {
    return this.db.collection(process.env.DB_FOLLOW_COLLECTION as string);
  }

  get medias() {
    return;
  }

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

    findRfTokenByUserId: async (user_id: ObjectId) => {
      const rfToken = await this.refreshTokens.findOne({ user_id });
      return rfToken;
    },

    insertRfToken: async (payload: RefreshTokenModel) => {
      const rfToken = await this.refreshTokens.insertOne(payload);
      return rfToken;
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
    }
  };

  tweetsMethods = {};
}

const database = new Database();
export default database;
