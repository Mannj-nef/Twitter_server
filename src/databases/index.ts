import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.leo8sxn.mongodb.net/?retryWrites=true&w=majority`;

class Database {
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(uri);
  }

  connect = async () => {
    const client = this.client;

    try {
      await client.db('admin').command({ ping: 1 });
      console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } catch (error) {
      console.dir(error);
    } finally {
      await client.close();
    }
  };
}

const database = new Database();
export default database;
