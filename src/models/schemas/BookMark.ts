import { ObjectId } from 'mongodb';

export interface IBookmark {
  _id?: string;
  user_id: string;
  tweet_id: string;
  created_at?: Date;
}

class BookMarkModel {
  _id?: ObjectId;
  user_id: ObjectId;
  tweet_id: ObjectId;
  created_at?: Date;

  constructor(bookMark: IBookmark) {
    const date = new Date();

    this._id = new ObjectId(bookMark._id) || new ObjectId();
    this.user_id = new ObjectId(bookMark.user_id);
    this.tweet_id = new ObjectId(bookMark.tweet_id);
    this.created_at = this.created_at || date;
  }
}

export default BookMarkModel;
