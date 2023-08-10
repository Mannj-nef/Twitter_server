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
  middlewaresAuth.verifyStatusUser,
  validate.follow,
  wrapRequestHandle(followController.follow)
);

// [GET]------------------------------------------------

/**
 * [GET]
 * Paht /follow/follwing
 * Param: {user_id: string}
 * Response: {message: string, result: FollowerModel[]}
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
 * Response: {message: string, result: FollowerModel[]}
 */
followRouter.get(
  '/follwers',
  middlewaresAuth.authentication,
  wrapRequestHandle(followController.follower)
);

// [DELETE]------------------------------------------------

/**
 * [DELETE]
 * Path: /:followed_user_id
 * Header: { Authorization: 'Bearer <access_token>' }
 * Response: { message: string }
 */
followRouter.delete(
  '/:followed_user_id',
  middlewaresAuth.authentication,
  middlewaresAuth.verifyStatusUser,
  validate.follow,
  wrapRequestHandle(followController.unFollow)
);

export default followRouter;
