import { Router } from 'express';
import followController from '~/controllers/followController';
import middlewaresAuth from '~/middlewares/auth';
import validate from '~/middlewares/users';
import wrapRequestHandle from '~/utils/wrapRequest.util';

const followRouter = Router();

/**
 * [PORT]
 * Path: /
 * Header: { Authorization: 'Bearer <access_token>' }
 * Body: { followed_user_id: string }
 * Response: { message: string }
 */
followRouter.post(
  '/',
  middlewaresAuth.authentication,
  validate.follow,
  wrapRequestHandle(followController.follow)
);

// [GET]------------------------------------------------

/**
 * [GET]
 * Paht /follow/follwing
 * Param: {user_id: string}
 * Response: {message: string, user: []}
 */

followRouter.get(
  '/follwing',
  middlewaresAuth.authentication,
  wrapRequestHandle(followController.following)
);

/**
 * [GET]
 * Paht /follow/follwers
 * Param: {followed_user_id: string}
 * Response: {message: string, user: []}
 */
followRouter.get(
  '/follwers',
  middlewaresAuth.authentication,
  wrapRequestHandle(followController.follower)
);

// [DELETE]------------------------------------------------

/**
 * [DELETE]
 * Path: /
 * Header: { Authorization: 'Bearer <access_token>' }
 * Body: { followed_user_id: string }
 * Response: { message: string }
 */
followRouter.delete(
  '/',
  middlewaresAuth.authentication,
  validate.follow,
  wrapRequestHandle(followController.unFollow)
);

export default followRouter;
