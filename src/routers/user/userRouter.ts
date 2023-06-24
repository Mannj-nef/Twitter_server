import userController from '~/controllers/userController';
import { Router } from 'express';
import validate from '~/middlewares/users/';
import wrapRequestHandle from '~/utils/wrapRequest.util';
import middlewaresAuth from '~/middlewares/auth';

//  Path: /users
const userRouter = Router();

/**
 * [GET]
 * Path: /me
 * Header: {Authorization: 'Bearer <access_token>'}
 * Response: Omit<UserModel[], {
 *              password: string,
 *              forgot_password_token: JWT<forgot_password_token>,
 *              verify-email-token: JWT<email_verify_token>
 *           }>
 */

userRouter.get('/me', middlewaresAuth.authentication, wrapRequestHandle(userController.getMe));

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
 * Response: { accessToken: JWT<access_token>, refreshToken: JWT<access_token> }
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

/**
 * [PORT]
 * Path: /forgot-password
 * Body: { email: string }
 * Response: { message: string }
 */
userRouter.post(
  '/forgot-password',
  validate.forgotPassword,
  wrapRequestHandle(userController.forgotPassword)
);

/**
 * [PORT]
 * Path: /verify-forgot-password
 * Body: { forgot_password_token: JWT<forgot_password_token> }
 * Response: { message: string }
 */
userRouter.post(
  '/verify-forgot-password',
  validate.forgotPasswordToken,
  middlewaresAuth.verifyForgotPassWordToken,
  wrapRequestHandle(userController.verifyForgotPassWord)
);

/**
 * [PORT]
 * Path: /reset-password
 * Body: { password: string, confirm_password: string, forgot_password_token: JWT<forgot_password_token> }
 * Response: { message: string }
 */
userRouter.post(
  '/reset-password',
  validate.resetPassword,
  middlewaresAuth.verifyForgotPassWordToken,
  wrapRequestHandle(userController.resetPassword)
);

export default userRouter;
