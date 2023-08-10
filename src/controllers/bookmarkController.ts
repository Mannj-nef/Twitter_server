import { Request, Response } from 'express';

const bookMarkController = {
  getBookMark: (req: Request, res: Response) => {
    return res.json({
      message: 'getBookMark success'
    });
  },
  bookMark: (req: Request, res: Response) => {
    return res.json({
      message: 'bookMark success'
    });
  },
  unBookMark: (req: Request, res: Response) => {
    return res.json({
      message: 'unBookMark success'
    });
  }
};

export default bookMarkController;
