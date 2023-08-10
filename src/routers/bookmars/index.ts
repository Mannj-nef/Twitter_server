import { Router } from 'express';
import bookMarkController from '~/controllers/bookmarkController';
import middlewaresAuth from '~/middlewares/auth';
import wrapRequestHandle from '~/utils/wrapRequest.util';

const bookmarkRouter = Router();

// [GET]-----------------------------------------
/**
 * [GET]
 * Path: /
 * Header: { Authorization: 'Bearer <access_token>' }
 * Response: { message: string , result: BookmarkModel[] }
 */
bookmarkRouter.get(
  '/',
  middlewaresAuth.authentication,
  wrapRequestHandle(bookMarkController.getBookMark)
);

// [POST]-----------------------------------------

/**
 * [POST]
 * Path: /
 * Header: { Authorization: 'Bearer <access_token>' }
 * Request: { tweet_id: string }
 * Response: { message: string, result: BookmarkModel }
 */
bookmarkRouter.post(
  '/',
  middlewaresAuth.authentication,
  wrapRequestHandle(bookMarkController.bookMark)
);

// [DELETE]-----------------------------------------

/**
 * [DELETE]
 * Path: /:tweet-id:
 * Header: { Authorization: 'Bearer <access_token>' }
 * Response: { message: string }
 */
bookmarkRouter.delete(
  '/',
  middlewaresAuth.authentication,
  wrapRequestHandle(bookMarkController.unBookMark)
);

export default bookmarkRouter;
