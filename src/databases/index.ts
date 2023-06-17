import { Collection, Db, MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import UserModel from '~/models/schemas/User';

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
    const client = this.client;
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

  get refreshTokens() {
    return;
  }

  get followers() {
    return;
  }

  get medias() {
    return;
  }

  // methods
  userMethods = {
    findUser: async ({ email, ...resParam }: { email: string }) => {
      const user = await this.users.findOne({ email, resParam });
      return user;
    },

    findUserByEmail: async ({ email }: { email: string }) => {
      const user = await this.users.findOne({ email });
      return user;
    },

    checkExistEmail: async (email: string) => {
      const user = await this.userMethods.findUserByEmail({ email });
      return Boolean(user);
    },

    insertOneUser: async (user: UserModel) => {
      const result = await this.users.insertOne(user);
      return result;
    }
  };

  tweetsMethods = {};
}

const database = new Database();
export default database;
