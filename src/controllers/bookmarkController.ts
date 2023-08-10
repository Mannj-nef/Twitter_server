import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { WithId } from 'mongodb';
import { BOOKMARK_MESSAGES } from '~/constants/messages';
import { IBookmarkRequestBody, TokenPayload } from '~/interfaces/requests';
import { IResponse, IResponseResult } from '~/interfaces/response';
import BookMarkModel from '~/models/schemas/BookMark';
import bookmarkService from '~/services/bookmarks';

const bookMarkController = {
  // [GET] /bookmarks/
  getBookMark: (req: Request, res: Response) => {
    return res.json({
      message: BOOKMARK_MESSAGES.GET_BOOKMARK_SUCCESSFULLY
    });
  },

  // [POST] /bookmarks/
  bookMark: async (
    req: Request<ParamsDictionary, IResponseResult<BookMarkModel>, IBookmarkRequestBody>,
    res: Response<IResponseResult<WithId<BookMarkModel>>>
  ) => {
    const { tweet_id } = req.body;
    const { user_id } = req.decoded_token as TokenPayload;

    const result = await bookmarkService.bookmark({ tweet_id, user_id });

    return res.json({
      message: BOOKMARK_MESSAGES.BOOKMARK_SUCCESSFULLY,
      result
    });
  },

  // [DELETE] /bookmarks/:tweet-id
  unBookMark: async (req: Request, res: Response<IResponse>) => {
    const { tweet_id } = req.params;
    const { user_id } = req.decoded_token as TokenPayload;

    await bookmarkService.unBookmark({ tweet_id, user_id });

    return res.json({
      message: BOOKMARK_MESSAGES.UN_BOOKMARK_SUCCESSFULLY
    });
  }
};

export default bookMarkController;
