import { Request, Response } from 'express';

const tweetController = {
  // [GET] /tweet
  getAll: (rep: Request, res: Response) => {
    res.json('alo');
  },

  // [PORT] /tweet
  createTweer: (req: Request, res: Response) => {
    return res.json({
      result: req.body
    });
  }
};

export default tweetController;
