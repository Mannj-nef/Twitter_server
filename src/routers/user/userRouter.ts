import userController from '~/controllers/userController';
import { Router } from 'express';
import { validate } from '~/middlewares/users/';
import wrapRequestHandle from '~/utils/wrapRequest.util';
import middlewaresAuth from '~/middlewares/auth';

//  Path: /users
const userRouter = Router();

/**
 * [GET]
 * Path: /
 * Body: {} | {page: number, limit: number}
 * Response: UserModel[]
 */
userRouter.get('/', wrapRequestHandle(userController.getall));

/**
 * [POST]
 * Path: /login
 * Body: {email: string, password: string }
 * Response: { accessToken: string, refetchToken: string, message: string }
 */
userRouter.post('/login', validate.validateLogin, wrapRequestHandle(userController.login));

/**
 * [PORT]
 * Path: /register
 * Body: { name: string, email: string, password: string, confirm_password: string, date_birth: isISO8601 }
 * Response: { message: string }
 */
userRouter.post('/register', validate.validateRegister, wrapRequestHandle(userController.register));

/**
 * [PORT]
 * Path: /logout
 * Header: {Authorization: 'Bearer <access_token>'}
 * Body: { refetchToken: string }
 * Response: { message: string }
 */
userRouter.post(
  '/logout',
  middlewaresAuth.authentication,
  validate.validateLogout,
  wrapRequestHandle(userController.logout)
);

export default userRouter;
