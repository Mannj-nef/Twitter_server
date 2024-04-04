import { Request, Response } from 'express';
import SEARCH_MESSAGE from '~/constants/messages/search.message';

const searchController = {
  // GET /search
  search: (req: Request, res: Response) => {
    const contentSearch = req.query.content;
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    return res.json({
      message: SEARCH_MESSAGE.SUCCESS
    });
  }
};

export default searchController;
