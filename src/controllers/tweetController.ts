import { Request, Response } from 'express';

const tweetController = {
  // [GET] /tweet
  getAll: (rep: Request, res: Response) => {
    res.json('alo');
  },

  // [PORT] /tweet
  createTweer: (req: Request, res: Response) => {
    res.json('hello');
  }
};

export default tweetController;
