import { Request, Response, query } from 'express';
import SEARCH_MESSAGE from '~/constants/messages/search.message';
import { MediaType } from '~/enums';
import searchServices from '~/services/search';

const searchController = {
  // GET /search
  search: async (req: Request, res: Response) => {
    const contentSearch = req.query.content;
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 1;
    const userId = req.decoded_token?.user_id as string;

    const result = await searchServices.search({
      content: contentSearch as string,
      page,
      limit,
      userId,
      mediaType: req.query.media_type as MediaType
    });

    return res.json({
      message: SEARCH_MESSAGE.SUCCESS,
      page,
      limit,
      total: result.totalCount,
      result: result.data
    });
  }
};

export default searchController;
