import { Router } from 'express';
import bookMarkController from '~/controllers/bookmarkController';
import middlewaresAuth from '~/middlewares/auth';
import bookmarkValidate from '~/middlewares/bookmarks';
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
  middlewaresAuth.verifyStatusUser,
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
  middlewaresAuth.verifyStatusUser,
  bookmarkValidate.validateIdTweet,
  wrapRequestHandle(bookMarkController.bookMark)
);

// [DELETE]-----------------------------------------

/**
 * [DELETE]
 * Path: /:tweet_id:
 * Header: { Authorization: 'Bearer <access_token>' }
 * Response: { message: string }
 */
bookmarkRouter.delete(
  '/:tweet_id',
  middlewaresAuth.authentication,
  middlewaresAuth.verifyStatusUser,
  bookmarkValidate.validateIdTweet,
  wrapRequestHandle(bookMarkController.unBookMark)
);

export default bookmarkRouter;
