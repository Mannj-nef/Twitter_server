import userController from '~/controllers/userController';
import { Router } from 'express';
import validate from '~/middlewares/users/';
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
 * Response: { accessToken: JWT<access_token>, refetchToken: JWT<refresh_token>, message: string }
 */
userRouter.post('/login', validate.login, wrapRequestHandle(userController.login));

/**
 * [PORT]
 * Path: /register
 * Body: { name: string, email: string, password: string, confirm_password: string, date_birth: isISO8601 }
 * Response: { message: string }
 */
userRouter.post('/register', validate.register, wrapRequestHandle(userController.register));

/**
 * [PORT]
 * Path: /logout
 * Header: {Authorization: 'Bearer <access_token>'}
 * Body: { refetchToken: JWT<refersh_token> }
 * Response: { message: string }
 */
userRouter.post(
  '/logout',
  middlewaresAuth.authentication,
  validate.logout,
  middlewaresAuth.verifyRefreshToken,
  wrapRequestHandle(userController.logout)
);

/**
 * [PORT]
 * Path: /verify-email
 * Body: { verify-email-token: JWT<email_verify_token> }
 * Response: { access_token, refresh_token }
 */
userRouter.post(
  '/veriry-email',
  validate.emailToken,
  middlewaresAuth.emailVerifyToken,
  wrapRequestHandle(userController.verifyEmail)
);

/**
 * [PORT]
 * Path: /send-email
 * Header: {Authorization: 'Bearer <access_token>'}
 * Response: { message: string }
 */
userRouter.post(
  '/send-email',
  middlewaresAuth.authentication,
  middlewaresAuth.checkVerifyUser,
  wrapRequestHandle(userController.sendEmail)
);

export default userRouter;
